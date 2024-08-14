import { Page } from "@playwright/test";

export class GitLabPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    playwrightReportBtn = () => this.page.getByTestId('gitlab-playwright-button');
    playwrightOptionsBtn = () => this.page.getByTestId('gitlab-playwright-opt-btn');
    playwrightLastPipelineLogBtn = () => this.page.getByTestId('gitlab-playwright-last-log-btn');

    async goto() {
        await this.page.goto('http://localhost:3001/myproject/merge_requests/123');
    }
}