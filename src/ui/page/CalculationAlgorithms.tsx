import { Job, JobStates } from "../store/globalStateProvider";

enum SortType {
  ByArrivalTime = "arrivalTime",
  ByJobCycle = "jobTime",
}

/**
 * Sorts jobs by arrival or job cycles
 *
 * @param {JobStates} unsortedJob
 * @param {SortType} sortType
 * @return {*}
 */
function sortJobs(unsortedJob: Job[], sortType: SortType) {
  return [...unsortedJob].sort((a, b) => {
    switch (sortType) {
      case SortType.ByArrivalTime:
        return a.arrivalTime - b.arrivalTime;
      case SortType.ByJobCycle:
        return a.jobTime - b.jobTime;
      default:
        console.error("Switch case wrong");
        return 0;
    }
  });
}

export function FirstComeFirstServe(jobs: JobStates): Job[] {
  const finishedJobs: Job[] = [];

  const newJobs = sortJobs(jobs.jobDetails, SortType.ByArrivalTime);

  // No preemption, no reordering so we're sticking to one for loop
  for (let i = 0; i < newJobs.length; i++) {
    const job = newJobs[i];
    finishedJobs.push(job);
  }

  return finishedJobs;
}

//
export function ShortestJobNext(jobs: JobStates): Job[] {
  const finishedJobs: Job[] = [];
  let currentTime = 0;

  let newJobs = sortJobs(jobs.jobDetails, SortType.ByArrivalTime);

  while (newJobs.length > 0) {
    // Look for available jobs at arrival
    const availableJobs = newJobs.filter(
      (job) => job.arrivalTime <= currentTime
    );

    // Only way to "increment" the time
    if (availableJobs.length > 0) {
      // find job with shortest job value
      const job = availableJobs.reduce((shortest, current) =>
        current.jobTime < shortest.jobTime ? current : shortest
      );

      // Push job into finishedJobs
      finishedJobs.push(job);

      // Increment time with current job cycle time
      currentTime += job.jobTime;

      // pop job from original newJobs
      newJobs = newJobs.filter((j) => j !== job);
    }
    // "incrementing" arrival time
    else {
      currentTime = newJobs[0].arrivalTime;
    }
  }
  // if (currentTime > maxTime) console.warn("MAXTIME Exceeded");
  console.log(finishedJobs);

  return finishedJobs;
}

export function ShortestRemainingTime(jobs: JobStates): Job[] {
  const finishedJobs: Job[] = [];
  let currentTime = 0;

  let newJobs = sortJobs(jobs.jobDetails, SortType.ByArrivalTime);

  while (newJobs.length > 0) {
    // Look for available jobs at arrival
    const availableJobs = newJobs.filter(
      (job) => job.arrivalTime <= currentTime
    );

    // increment time to first job in sorted list if not
    if (availableJobs.length > 0) {
      // Job with the shortest time next in avialable time
      const job = sortJobs(availableJobs, SortType.ByJobCycle)[0];

      // find next job arrival time value, it could be undefined if last
      const nextArrivalTime = newJobs.find(
        (j) => j.arrivalTime > currentTime
      )?.arrivalTime;

      // gap of current time and next arrival
      const timeToRun = nextArrivalTime
        ? Math.min(job.jobTime, nextArrivalTime - currentTime)
        : job.jobTime;

      const jobRemaining = { ...job };
      jobRemaining.jobTime -= timeToRun;
      jobRemaining.arrivalTime = currentTime;
      currentTime += timeToRun;

      // Job completed
      if (jobRemaining.jobTime === 0) {
        newJobs = newJobs.filter((j) => j !== job);
      } else {
        // replace current job with updated job time value
        newJobs = newJobs.map((j) => (j === job ? jobRemaining : j));
      }
      finishedJobs.push({
        jobName: job.jobName,
        jobTime: timeToRun,
        arrivalTime: job.arrivalTime,
      });
    } else {
      // If no jobs are available, jump to the next job's arrival time
      currentTime = newJobs[0].arrivalTime;
    }
  }

  // Could have been combined with for loop but as a last step, combine jobs with consecutive job names
  return CombineJobs(finishedJobs);
}

export function RoundRobin(jobs: JobStates): Job[] {
  const finishedJobs: Job[] = [];
  let currentTime = 0;
  const quantumTime = jobs.quantumTime;
  let newJobs = sortJobs(jobs.jobDetails, SortType.ByArrivalTime);

  while (newJobs.length > 0) {
    const availableJobs = newJobs.filter(
      (job) => job.arrivalTime <= currentTime
    );

    if (availableJobs.length > 0) {
      // First job is the first arrival time and doesn't care about the job duration
      const job = availableJobs[0];
      // Max time to run is dependant on time quantum
      const timeToRun = Math.min(job.jobTime, quantumTime);
      currentTime += timeToRun;

      // execution is recorded before condition since it won't be interrupted
      finishedJobs.push({
        jobName: job.jobName,
        jobTime: timeToRun,
        arrivalTime: job.arrivalTime,
      });

      const jobRemaining = { ...job };
      jobRemaining.jobTime -= timeToRun;

      // Job completed
      if (jobRemaining.jobTime === 0) {
        newJobs = newJobs.filter((j) => j !== job);
      }
      // Requeue job with updated remaining time
      else {
        newJobs = newJobs.filter((j) => j !== job);
        newJobs.push(jobRemaining);
      }
    } else {
      // No jobs available, jump to the next arrival time
      currentTime = newJobs[0].arrivalTime;
    }
  }

  // Could have been combined with for loop but as a last step, combine jobs with consecutive job names
  return CombineJobs(finishedJobs);
}

function CombineJobs(finishedJobs: Job[]) {
  return finishedJobs.reduce((combined, currentJob) => {
    // if first element or jobname is consecutively different, push directly
    if (
      combined.length === 0 ||
      currentJob.jobName !== combined[combined.length - 1].jobName
    ) {
      combined.push({ ...currentJob });
    } else {
      // accumulate previous job time value with current job
      const lastJob = combined[combined.length - 1];
      lastJob.jobTime += currentJob.jobTime;
    }
    return combined;
  }, [] as Job[]);
}
