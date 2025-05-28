import { test, expect } from '@playwright/test';

test('page d’accueil doit afficher le titre', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CV Sort Application/i); // ajuste selon le vrai titre
});
