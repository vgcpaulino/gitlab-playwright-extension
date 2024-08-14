import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
    testDir: './tests',
    testMatch: '**/*.test.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:3001/myproject/merge_requests/123',
            }
        },
    ],
    webServer: [
        {
            command: 'npm run start:dev:server',
            url: 'http://127.0.0.1:3001',
            reuseExistingServer: !process.env.CI,
        },
    ]
});
