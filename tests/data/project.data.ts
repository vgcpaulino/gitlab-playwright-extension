interface Pipeline {
    id: string;
}

export class ProjectData {
    pipelines = [];
    name: string;
    id: string;
    jobName: string;
    jobUrl: string;
    
    constructor({ name, id, jobName, jobUrl }: { name: string; id: string; jobName: string; jobUrl: string }) {
        this.name = name || 'myproject';
        this.id = id || '9999';
        this.jobName = jobName || 'E2E MR';
        this.jobUrl = jobUrl || 'http://localhost:3001/artifacts/${jobId}/report.html'
    }

    generate() {
        return {
            project: {
                name: this.name,
                id: this.id,
                jobName: this.jobName,
                jobUrl: this.jobUrl,
            },
            pipelines: this.pipelines,
        }
    }

    addPipeline() {
    }
}