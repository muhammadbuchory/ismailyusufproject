import { test, expect } from '@playwright/test';
test('public navigation animates content while the header remains stable', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const header = await page.locator('.site-header').boundingBox();
  await page.evaluate(() => {
    document.addEventListener('animationstart', (event) => {
      if (event.animationName === 'page-enter')
        document.documentElement.dataset.motionHeading =
          (event.target as HTMLElement).querySelector('h1')?.textContent ?? '';
    });
  });
  await page
    .getByRole('link', { name: 'About me', exact: true })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Me');
  await expect(page.locator('html')).toHaveAttribute(
    'data-motion-heading',
    'About Me',
  );
  const after = await page.locator('.site-header').boundingBox();
  expect(after?.y).toBe(header?.y);
  expect(after?.height).toBe(header?.height);
  await expect(page.getByRole('link', { name: 'Get in touch' })).toBeEnabled();
});
test('scroll navigation restores position and back-to-top returns focus to content', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const project = page.getByRole('link', { name: 'Explore research' }).first();
  await page.mouse.wheel(0, 1600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(600);
  await expect(page.getByRole('button', { name: 'Back to top' })).toBeVisible();
  await project.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    document.addEventListener(
      'click',
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest('a[href="/research/research-1"]')
        )
          document.documentElement.dataset.departureScroll = String(scrollY);
      },
      { capture: true },
    );
  });
  await project.click();
  await expect(
    page.getByRole('heading', { name: 'Research objectives' }),
  ).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const saved = await page
    .locator('html')
    .getAttribute('data-departure-scroll');
  expect(saved).not.toBeNull();
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Advancing knowledge',
  );
  await expect
    .poll(() =>
      page.evaluate((value) => Math.abs(scrollY - Number(value)), saved),
    )
    .toBeLessThan(5);
  await page.getByRole('button', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(page.getByRole('main')).toBeFocused();
});
test('reduced motion keeps public content visible and scroll controls usable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const item = page.locator('.research-item').first();
  await page.mouse.wheel(0, 1600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(600);
  await item.scrollIntoViewIfNeeded();
  await expect(item).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === 'running')
          .length,
    ),
  ).toBe(0);
  await page.getByRole('button', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('scroll reveal runs on entry and stops when reduced motion is enabled', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.locator('.page-transition').evaluate(async (el) => {
    await Promise.all(
      el.getAnimations().map((a) => a.finished.catch(() => {})),
    );
  });
  const project = page.locator('.research-item').first();
  await page.mouse.wheel(0, 1600);
  await expect
    .poll(() =>
      project.evaluate((el) =>
        el.getAnimations().some((a) => a.playState === 'running'),
      ),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      project.evaluate(
        (el) =>
          el.getAnimations().filter((a) => a.playState === 'running').length,
      ),
    )
    .toBe(0);
  await expect(project).toHaveCSS('opacity', '1');
});
