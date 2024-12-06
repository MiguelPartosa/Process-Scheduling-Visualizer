import { useState, createContext } from "react";

type JobStates = {
  jobTime: Array<number>;
  arrivalTime: Array<number>;
  quantumTime: number;
};

// typescript is weird. quantum is an optional param here so we don't get errors when calling changejobduration function
export type GeneralContextType = {
  jobs: JobStates;
  jobType: number;
  updateJob: (jobnumber: number) => void;
  updateJobType: (jobtype: number) => void;
  changeJobDuration: (
    jobduration: number,
    jobindex: number | undefined,
    quantum?: boolean
  ) => void;
  changeArrivalTime: (
    arrivaltime: number,
    jobindex: number | undefined
  ) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

// Gives jobtypes 0~3 and a 1~5 element array of 0 and 1+
const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // first jobtype is fcfs
  const [jobType, setJobType] = useState(0);
  // default value, minimum nubmer of jobs is one
  const [jobs, setJobs] = useState<JobStates>({
    jobTime: [1, -1, -1, -1, -1],
    arrivalTime: [0, -1, -1, -1, -1],
    quantumTime: 0,
  });

  // For uniformity sake, ignored jobs and arrival times are valued -1
  // updates both jobs and arrival time values
  const updateJob = (jobnumber: number) =>
    setJobs((prevJob) => {
      // condition for both
      const updateValue = (value: number, index: number, initial:number): number => {
        return index <= jobnumber ? (value === -1 ? initial : value) : -1;
      };
    
      for (let i = 0; i < 5; i++) {
        prevJob.jobTime[i] = updateValue(prevJob.jobTime[i], i, 1);
        prevJob.arrivalTime[i] = updateValue(prevJob.arrivalTime[i], i, 0);
      }
      // const updatedJobs: Array<number> = prevJob.jobTime.map((job, index) => {
      //   // condition for bringing upper jobs to 0 when lowering the slider
      //   if (index <= jobnumber) {
      //     return job === 0 ? 1 : job;
      //   } else {
      //     // setting the jobs to 1 or prev value if less jobnumber >= job
      //     return -1;
      //   }
      // });
      return { ...prevJob};
    });

  const updateJobType = (jobtype: number) => {
    if (jobtype >= 0 && jobtype <= 3) {
      setJobType(jobtype);
    } else console.log("Job type index out of range(0~3): " + jobtype);
  };

  // TODO: message component to show error messages for bad inputs

  const changeJobDuration = (
    jobduration: number,
    jobindex?: number,
    quantum: boolean = false
  ) => {
    const newJobs = jobs.jobTime.map((job, index) =>
      index === jobindex ? jobduration : job
    );
    const index = jobindex !== undefined ? jobindex : 0;
    if (!(index >= 0 && index <= 4)) {
      console.log("Job duration index out of range");
      return;
    }
    if (jobduration < 1) {
      console.log("Job duration must be greater than 1");
      return;
    }
    if (quantum) {
      setJobs({ ...jobs, quantumTime: jobduration });
    } else {
      setJobs({ ...jobs, jobTime: newJobs });
    }
  };

  const changeArrivalTime = (arrivaltime: number, jobindex?: number) => {
    const newJobs = jobs.arrivalTime.map((time, index) =>
      index === jobindex ? arrivaltime : time
    );
    const index = jobindex !== undefined ? jobindex : 0;
    if (!(index >= 0 && index <= 4)) {
      console.log("Arrival time index out of range");
      return;
    }
    if (arrivaltime < 0) {
      console.log("Arrival time must be greater than 0");
      return;
    }
    setJobs({ ...jobs, arrivalTime: newJobs });
  };

  return (
    <GeneralContext.Provider
      value={{
        jobs,
        jobType,
        updateJob,
        updateJobType,
        changeJobDuration,
        changeArrivalTime,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
