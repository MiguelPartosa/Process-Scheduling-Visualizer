import { Job, JobStates } from "../store/globalStateProvider";

type JobSend = {
  jobs: Job;
  jobType: number;
};

function sortJobs(unsortedJob: JobStates) {
  return [...unsortedJob.jobDetails].sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );
}

export function FirstComeFirstServe(jobs, jobType): JobSend {
  let newJobs = sortJobs(jobs);
  console.log(newJobs);
  return null;
}

export function ShortestJobNext() {
  return null;
}

export function ShortestRemainingTime() {
  return null;
}

export function RoundRobin() {
  return null;
}
