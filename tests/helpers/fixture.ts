import { test as base, chromium, type BrowserContext, expect, Page } from '@playwright/test';
import path from 'path';
import { ExtensionPage } from '../pages/extension.page';
import { GitLabPage } from '../pages/gitLab.page';

export { expect };
export const test = base.extend<{
    context: BrowserContext;
    page: Page;
    extensionPage: ExtensionPage;
    gitLabPage: GitLabPage;
}>({
    context: async ({}, use) => {
        const pathToExtension = path.relative(process.cwd(), 'dist');
        const context = await chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });
        await use(context);
        await context.close();
    },
    page: async ({ context }, use) => {
        const pages = context.pages();
        const [page] = pages;
        use(page);
    },
    extensionPage: async ({ page }, use) => {
        use(new ExtensionPage(page));
    },
    gitLabPage: async ({ page }, use) => {
        use(new GitLabPage(page));
    },
});

