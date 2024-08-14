import { Page } from "@playwright/test";

export class ExtensionPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    projectItem = () => this.page.getByTestId('project-item');

    async goto() {
        await this.page.goto('chrome://extensions/');
        const extensionElement = this.page.locator('#extensions-section').locator('extensions-item').first();
        const extensionId = await extensionElement.getAttribute('id');
        await this.page.goto(`chrome-extension://${extensionId}/popup.html`);
    }

    async addProjectInformation() {
        await this.page.locator('#name').fill('myproject');
        await this.page.locator('#projectId').fill('123456');
        await this.page.locator('#jobName').fill('e2e mr');
        await this.page.locator('#artifactUrl').fill('http://localhost:3000/artifacts/${jobId}/report.html');
        await this.page.locator('button').click();
    }

    async clickEnableLogsToggle() {
        await this.page.locator('.toggle-switch').click();
    }
}