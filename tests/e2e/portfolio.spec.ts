import { expect, test } from '@playwright/test';

test('navega el carrusel y mantiene aislado el teclado del diálogo', async ({
  page,
}) => {
  await page.goto('/');

  const carousel = page.getByRole('region', {
    name: /Proyectos seleccionados/,
  });
  const counter = page.locator('.carousel-counter');
  await expect(counter).toContainText('01 / 06 — Galería');

  await page.getByRole('button', { name: 'Proyecto siguiente' }).click();
  await expect(counter).toContainText('02 / 06 — Rick & Morty Multiverse');

  await carousel.focus();
  await carousel.press('ArrowRight');
  await expect(counter).toContainText('03 / 06 — Catálogo de Películas');

  const trigger = page.getByRole('button', { name: /Ver proyecto/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Catálogo de Películas' });
  await expect(dialog).toBeVisible();

  const close = dialog.getByRole('button', { name: 'Cerrar proyecto' });
  await close.focus();
  await close.press('ArrowRight');
  await expect(counter).toContainText('03 / 06 — Catálogo de Películas');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('acepta el gesto horizontal del trackpad sin capturar el vertical', async ({
  page,
}) => {
  await page.goto('/');

  const carousel = page.getByRole('region', {
    name: /Proyectos seleccionados/,
  });
  const counter = page.locator('.carousel-counter');
  await expect(
    page.getByRole('button', { name: 'Proyecto siguiente' }),
  ).toBeEnabled();
  await carousel.hover();

  await page.mouse.wheel(0, 180);
  await expect(counter).toContainText('01 / 06 — Galería');

  await page.mouse.wheel(120, 0);
  await expect(counter).toContainText('02 / 06 — Rick & Morty Multiverse');
});

test('distingue el proyecto real de los conceptos', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('button', { name: 'Ver Rick & Morty Multiverse' })
    .click();
  const realProject = page.getByRole('article', {
    name: '2 de 6: Rick & Morty Multiverse',
  });
  await expect(realProject).toBeVisible();
  await expect(realProject).not.toContainText('Proyecto de ejemplo');
  await expect(
    realProject.getByRole('link', { name: /Código/ }),
  ).toHaveAttribute(
    'href',
    'https://github.com/VladimirWxyz/API-Rick-Morty-Multiverse',
  );

  const next = page.getByRole('button', { name: 'Proyecto siguiente' });
  await expect(next).toBeEnabled();
  await page.getByRole('button', { name: 'Ver Forma' }).click();
  const concept = page.getByRole('article', { name: '4 de 6: Forma' });
  await expect(concept).toContainText(
    'Concepto de interfaz · Proyecto de ejemplo',
  );
  await expect(concept.getByRole('link', { name: /Código/ })).toHaveCount(0);
});

test('recorre las vistas reales del proyecto Galería', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Proyecto siguiente' }),
  ).toBeEnabled();

  const project = page.getByRole('article', { name: '1 de 6: Galería' });
  await expect(
    project.getByRole('img', {
      name: /Vista administrativa de la cafetería/,
    }),
  ).toBeVisible();
  await expect(project).toContainText('Mi responsabilidad fue el módulo');

  await project.getByRole('button', { name: /Ver proyecto/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Galería' });
  const gallery = dialog.getByRole('region', {
    name: 'Recorrido visual de Galería',
  });
  await expect(gallery).toBeVisible();
  await dialog
    .getByRole('button', { name: 'Pausar avance automático' })
    .click();
  await gallery.hover();
  await page.mouse.wheel(120, 0);
  await expect(dialog.locator('.gallery-counter')).toContainText('02 / 11');
  await expect(page.locator('.carousel-counter')).toContainText(
    '01 / 06 — Galería',
  );
  await expect(
    dialog.getByRole('img', {
      name: /compartir la galería mediante código QR/,
    }),
  ).toBeVisible();
  await expect(dialog).toContainText('Publicación mediante QR');
});

test('abre la fotografía y conserva enlaces con semántica segura', async ({
  page,
}) => {
  await page.goto('/');

  const avatarTrigger = page.getByRole('button', {
    name: 'Ampliar fotografía de Vladimir Williams',
  });
  await expect(
    page.getByRole('button', { name: 'Proyecto siguiente' }),
  ).toBeEnabled();
  await avatarTrigger.click();
  const dialog = page.getByRole('dialog', {
    name: 'Fotografía de Vladimir Williams',
  });
  await expect(
    dialog.getByRole('img', { name: 'Retrato de Vladimir Williams' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(avatarTrigger).toBeFocused();

  await expect(page.getByRole('link', { name: /Hablemos/ })).toHaveAttribute(
    'href',
    '#contacto',
  );
  const whatsapp = page.getByRole('link', { name: /WhatsApp/ });
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/584129159744');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
});

test('no desborda horizontalmente en un móvil pequeño', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.getByRole('link', { name: /Hablemos/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
