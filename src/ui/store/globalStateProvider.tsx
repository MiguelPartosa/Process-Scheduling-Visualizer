import { useState, createContext } from "react";

export type Job = {
  jobName: string;
  jobTime: number;
  arrivalTime: number;
};

export type JobStates = {
  quantumTime: number;
  jobDetails: Job[];
  totalJobs: number;
};

export enum AlgorithmType {
  FirstComeFirstServe = 0,
  ShortestJobNext = 1,
  ShortestRemainingTime = 2,
  RoundRobin = 3,
}
export enum InputType {
  jobCycleTime = "job",
  arrivalTime = "arrival",
  quantumTime = "quantum",
}

// typescript is weird. quantum is an optional param here so we don't get errors when calling changejobduration function
export type GeneralContextType = {
  jobs: JobStates;
  jobType: number;
  showCalculation: boolean;
  setShowCalculation: (val: boolean | ((prevVal: boolean) => boolean)) => void;
  updateJobCount: (jobnumber: number) => void;
  updateJobType: (jobtype: number) => void;
  changeJobDetails: (
    value: number,
    inputType: InputType,
    valueIndex?: number
  ) => void;
  randomizeValues: (isJob: boolean) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

// Gives jobtypes 0~3 and a 1~5 element array of 0 and 1+
const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showCalculation, setShowCalculation] = useState(false);
  const [jobType, setJobType] = useState(0);
  // Values are set in advance since we're limiting the number of jobs to 5, it's easier this way
  const [jobs, setJobs] = useState<JobStates>({
    jobDetails: [
      { jobName: "A", arrivalTime: 0, jobTime: 1 },
      { jobName: "B", arrivalTime: 0, jobTime: 1 },
      { jobName: "C", arrivalTime: 0, jobTime: 1 },
      { jobName: "D", arrivalTime: 0, jobTime: 1 },
      { jobName: "E", arrivalTime: 0, jobTime: 1 },
    ],
    quantumTime: 1,
    totalJobs: 1,
  });

  /**
   * Randomizes job cycles and arrival times for available jobs
   *
   */
  const randomizeValues = () => {
    const generateRandomValue = () => Math.ceil(Math.random() * 15);
    const newJobDetails = jobs.jobDetails.map((job) => ({
      jobTime: job.jobTime !== -1 ? generateRandomValue() : job.jobTime,
      arrivalTime:
        job.arrivalTime !== -1 ? generateRandomValue() : job.arrivalTime,
      jobName: job.jobName,
    }));
    setJobs((prevjobs) => ({
      ...prevjobs,
      jobDetails: newJobDetails,
    }));
  };

  /**
   *  Used only for the jobslider, dictates the number of jobs to calculate.
   *
   * @param {number} jobnumber
   */
  const updateJobCount = (jobnumber: number) =>
    setJobs((prevJob) => {
      return { ...prevJob, totalJobs: jobnumber };
    });

  /**
   *  Changes the type of algorithm to be used. Used only in navbar.
   *
   * @param {number} jobtype
   */
  const updateJobType = (jobtype: number) => {
    if (jobtype >= 0 && jobtype <= 3) {
      setJobType(jobtype);
    } else console.log("Job type index out of range(0~3): " + jobtype);
  };

  /**
   *  Changes value for input at optional index. Used for all number inputs.
   *
   * @param {number} value
   * @param {InputType} inputType
   * @param {number} [valueIndex]
   */
  const changeJobDetails = (
    value: number,
    inputType: InputType,
    valueIndex?: number
  ) => {
    // Index may be undefined since we combined changing input values to all in one, including the non-indexed quantumTime
    const index = valueIndex !== undefined ? valueIndex : 0;

    setJobs((prevJob) => {
      const newJobDetails = [...prevJob.jobDetails];
      const newJobValue = { ...prevJob.jobDetails[index] };
      let newQuantumTime = prevJob.quantumTime;
      switch (inputType) {
        case InputType.jobCycleTime:
          newJobValue.jobTime = value < 1 ? 1 : value;
          newJobDetails[index] = newJobValue;
          break;

        case InputType.arrivalTime:
          newJobValue.arrivalTime = value < 1 ? 0 : value;
          newJobDetails[index] = newJobValue;
          break;

        case InputType.quantumTime:
          newQuantumTime = value < 1 ? 1 : value;
          break;

        default:
          console.error("Wrong input type");
          break;
      }
      return {
        ...prevJob,
        jobDetails: newJobDetails,
        quantumTime: newQuantumTime,
      };
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        showCalculation,
        setShowCalculation,
        jobs,
        jobType,
        updateJobCount,
        updateJobType,
        changeJobDetails,
        randomizeValues,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
