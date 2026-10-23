import { expect, test } from '@playwright/test';

test('translates page and gallery content and remembers the language', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/\?lang=en/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Welcome to',
  );
  await expect(
    page.getByRole('link', { name: 'Projects', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'A selection of what I’ve built.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Want to try some interactions?' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', {
      name: 'Thoughtful experiences. Carefully built code.',
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'View Pizzas House', exact: true })
    .click();
  await page.getByRole('button', { name: 'View project', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Pizzas House' });
  await expect(dialog).toContainText('A mobile ordering experience');
  await expect(dialog.getByRole('link', { name: 'Live site' })).toHaveAttribute(
    'href',
    'https://pizzashousepzo.com',
  );
  await dialog
    .getByRole('button', {
      name: 'View Precise location on the map',
      exact: true,
    })
    .click();
  await expect(dialog.locator('.gallery-counter')).toContainText('06 / 06');
  await expect(
    dialog.getByRole('img', { name: /Interactive map of Puerto Ordaz/ }),
  ).toBeVisible();
  await dialog.getByRole('button', { name: 'Close project' }).click();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Español', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Bienvenido a',
  );
  await expect(page.locator('.carousel-counter')).toContainText('Pizzas House');
  expect(errors).toEqual([]);
});

test('English share links override a saved preference and fit a small phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.addInitScript(() =>
    localStorage.setItem('portfolio-language', 'es'),
  );
  await page.goto('/?lang=en#inicio');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('button', { name: 'English', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'My portfolio.',
  );
  const width = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(width.document).toBeLessThanOrEqual(width.viewport);
  await page.screenshot({
    path: '/tmp/portfolio-english-mobile.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: '/tmp/portfolio-english-desktop.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Español', exact: true }).click();
  await expect(page).toHaveURL(/\?lang=es#inicio$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});
