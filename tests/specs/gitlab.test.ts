import { test, expect } from '../helpers/fixture';

test.describe('GitLab', () => {
    test('Should Display Buttons', async ({ page, extensionPage, gitLabPage }) => {
        await extensionPage.goto();
        await extensionPage.addProjectInformation();
        await extensionPage.clickEnableLogsToggle();

        await expect(extensionPage.projectItem()).toBeVisible();

        await page.route(/pipelines/, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(pipelinesBody),
            });
        });
        await page.route(/jobs/, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(jobsBody),
            });
        });
        await gitLabPage.goto();
        

        await expect(gitLabPage.playwrightReportBtn()).toBeVisible();
        await expect(gitLabPage.playwrightOptionsBtn()).toBeVisible();

        await gitLabPage.playwrightOptionsBtn().click();
        await gitLabPage.playwrightLastPipelineLogBtn().click();
    });
});

const pipelinesBody = [
    {
        "id": 1383232688,
        "iid": 157695,
        "project_id": 14580979,
        "sha": "d33de1513cf12adcc7f42400f83513caf1c72239",
        "ref": "refs/merge-requests/28811/merge",
        "status": "failed",
        "source": "merge_request_event",
        "created_at": "2024-07-22T15:26:08.118Z",
        "updated_at": "2024-07-22T16:13:21.909Z",
        "web_url": "https://gitlab.com/myproject/-/pipelines/1383232688"
    },
];

const jobsBody = [
    {
        "id": 7398842723,
        "status": "failed",
        "stage": "test",
        "name": "E2E MR",
        "web_url": "https://gitlab.com/myproject/-/jobs/7398842723",
    },
];