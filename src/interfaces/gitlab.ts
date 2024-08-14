type PipelineStatus = "success" | "canceled" | "failed";

export interface Pipeline {
  id: number; // 1386372751
  iid: number; // 158134
  project_id: number; // 14580979
  sha: string; // "cbf1b9a1be984a9f61b79a05f23b19f66d533537"
  ref: string; // "refs/merge-requests/29176/merge"
  status: PipelineStatus;
  source: string; // "merge_request_event"
  created_at: string; // "2024-07-24T13:33:08.508Z"
  updated_at: string; // "2024-07-24T13:55:41.465Z"
  web_url: string; // "https://gitlab.com/company/project/-/pipelines/1386372751"
}

type JobStatus = "success" | "manual" | "skipped" | "failed";

export interface Job {
  id: number;
  status: JobStatus;
  stage: string; // "test"
  name: string; // "E2E MR"
  ref: string; // "refs/merge-requests/28811/merge"
  created_at: string; // "2024-07-23T13:15:10.292Z"
  started_at: string; // "2024-07-23T13:15:11.206Z"
  finished_at: string; // "2024-07-23T13:21:32.247Z"
  pipeline: Pipeline;
  web_url: string; // "https://gitlab.com/company/project/-/jobs/7407164752",
}
