import { expect, test } from '@playwright/test';

test('navega el carrusel y mantiene aislado el teclado del diálogo', async ({
  page,
}) => {
  await page.goto('/');

  const carousel = page.getByRole('region', {
    name: /Proyectos seleccionados/,
  });
  const counter = page.locator('.carousel-counter');
  await expect(counter).toContainText('01 / 05 — Galería');

  await page.getByRole('button', { name: 'Proyecto siguiente' }).click();
  await expect(counter).toContainText('02 / 05 — Catálogo de Películas');

  await carousel.focus();
  await carousel.press('ArrowRight');
  await expect(counter).toContainText('03 / 05 — Forma');

  const trigger = page.getByRole('button', { name: /Ver proyecto/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Forma' });
  await expect(dialog).toBeVisible();

  const close = dialog.getByRole('button', { name: 'Cerrar proyecto' });
  await close.focus();
  await close.press('ArrowRight');
  await expect(counter).toContainText('03 / 05 — Forma');

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
  await expect(counter).toContainText('01 / 05 — Galería');

  await page.mouse.wheel(120, 0);
  await expect(counter).toContainText('02 / 05 — Catálogo de Películas');
  await expect(
    page.getByRole('button', {
      name: 'Activar avance automático de proyectos',
    }),
  ).toHaveAttribute('aria-pressed', 'false');
});

test('avanza automáticamente y permite pausar los proyectos', async ({
  page,
}) => {
  await page.goto('/');

  const counter = page.locator('.carousel-counter');
  const pause = page.getByRole('button', {
    name: 'Pausar avance automático de proyectos',
  });
  await expect(counter).toContainText('01 / 05 — Galería');
  await expect(pause).toHaveAttribute('aria-pressed', 'true');
  await expect(counter).toContainText('02 / 05 — Catálogo de Películas', {
    timeout: 7000,
  });

  await pause.click();
  await expect(
    page.getByRole('button', {
      name: 'Activar avance automático de proyectos',
    }),
  ).toHaveAttribute('aria-pressed', 'false');
});

test('distingue el proyecto real de los conceptos', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Ver Catálogo de Películas' }).click();
  const realProject = page.getByRole('article', {
    name: '2 de 5: Catálogo de Películas',
  });
  await expect(realProject).toBeVisible();
  await expect(realProject).not.toContainText('Proyecto de ejemplo');
  await expect(
    realProject.getByRole('link', { name: /Código/ }),
  ).toHaveAttribute(
    'href',
    'https://github.com/VladimirWxyz/Catalogo-peliculas',
  );

  const next = page.getByRole('button', { name: 'Proyecto siguiente' });
  await expect(next).toBeEnabled();
  await page.getByRole('button', { name: 'Ver Forma' }).click();
  const concept = page.getByRole('article', { name: '3 de 5: Forma' });
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

  const project = page.getByRole('article', { name: '1 de 5: Galería' });
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
    '01 / 05 — Galería',
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

test('desplaza suavemente hacia contacto y de regreso al inicio', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const behavior = await page
    .locator('html')
    .evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(behavior).toBe('smooth');

  await page.getByRole('link', { name: 'Ver proyectos' }).click();
  await expect(page).toHaveURL(/#proyectos$/);

  await page.getByRole('link', { name: /Hablemos/ }).click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.getByRole('link', { name: /Volver arriba/ })).toBeVisible();
  await page.getByRole('link', { name: /Volver arriba/ }).click();
  await expect(page).toHaveURL(/#inicio$/);
});

test('no desborda horizontalmente en un móvil pequeño', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  const carousel = page.getByRole('region', {
    name: /Proyectos seleccionados/,
  });
  await expect(
    page.getByRole('button', { name: 'Pausar carrusel' }),
  ).toBeEnabled();
  await carousel
    .locator('[data-slot="carousel-content"]')
    .dispatchEvent('pointerdown', {
      pointerType: 'touch',
      isPrimary: true,
    });
  await expect(
    page.getByRole('button', { name: 'Reanudar carrusel' }),
  ).toHaveAttribute('aria-pressed', 'false');

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.getByRole('link', { name: /Hablemos/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const project = page.getByRole('article', { name: '1 de 5: Galería' });
  const copy = await project.locator('.project-copy').boundingBox();
  const image = await project.locator('.project-photo').boundingBox();
  const actions = await project.locator('.project-card-actions').boundingBox();
  expect(copy?.y).toBeLessThan(image?.y ?? 0);
  expect(image?.y).toBeLessThan(actions?.y ?? 0);

  const motion = page.locator('.motion-shape');
  expect(
    await motion.evaluate((node) => getComputedStyle(node).transitionDuration),
  ).not.toBe('0.01ms');

  await page
    .getByRole('button', { name: 'Ampliar fotografía de Vladimir Williams' })
    .click();
  const avatarDialog = page.getByRole('dialog', {
    name: 'Fotografía de Vladimir Williams',
  });
  const avatarBounds = await avatarDialog.boundingBox();
  expect(avatarBounds?.x).toBeGreaterThanOrEqual(0);
  expect(
    (avatarBounds?.x ?? 0) + (avatarBounds?.width ?? 0),
  ).toBeLessThanOrEqual(320);

  await page.keyboard.press('Escape');
  await project.getByRole('button', { name: 'Ver proyecto' }).click();
  const projectDialog = page.getByRole('dialog', { name: 'Galería' });
  await expect(projectDialog).toBeVisible();
  const dialogBounds = await projectDialog.boundingBox();
  expect(dialogBounds?.x).toBeGreaterThanOrEqual(0);
  expect(
    (dialogBounds?.x ?? 0) + (dialogBounds?.width ?? 0),
  ).toBeLessThanOrEqual(320);
  const dialogLayout = await projectDialog.evaluate((node) => ({
    clientWidth: node.clientWidth,
    scrollWidth: node.scrollWidth,
    transitionDuration: getComputedStyle(node).transitionDuration,
  }));
  expect(dialogLayout.scrollWidth).toBeLessThanOrEqual(
    dialogLayout.clientWidth,
  );
  expect(dialogLayout.transitionDuration).toContain('0.24s');

  const galleryBounds = await projectDialog
    .locator('.project-gallery')
    .boundingBox();
  const controlsBounds = await projectDialog
    .locator('.gallery-controls')
    .boundingBox();
  expect(controlsBounds?.x).toBeGreaterThanOrEqual(galleryBounds?.x ?? 0);
  expect(
    (controlsBounds?.x ?? 0) + (controlsBounds?.width ?? 0),
  ).toBeLessThanOrEqual((galleryBounds?.x ?? 0) + (galleryBounds?.width ?? 0));
});
