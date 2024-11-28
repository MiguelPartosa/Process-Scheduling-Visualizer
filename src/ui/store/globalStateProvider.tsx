import { useState, createContext } from "react";

type GeneralContextType = {
  jobs: Array<number>;
  jobType: number;
  updateJob: (jobnumber: number) => void;
  updateJobType: (jobtype: number) => void;
};

const GeneralContext = createContext<GeneralContextType | null>(null);

// Gives jobtypes 0~3 and a 1~5 element array of 0 and 1+
const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // first jobtype is fcfs
  const [jobType, setJobType] = useState(0);
  // default value, minimum nubmer of jobs is one
  const [jobs, setJobs] = useState([1, 0, 0, 0, 0]);

  // 0 = ignore this job in caclulation
  const updateJob = (jobnumber: number) =>
    setJobs((jobs) => {
      const updatedJobs: Array<number> = jobs.map((job, index) => {
        // condition for bringing upper jobs to 0 when lowering the slider
        if (index <= jobnumber) {
          return job === 0 ? 1 : job;
        } else {
          // setting the jobs to 1 or prev value if less jobnumber >= job
          return 0;
        }
      });
      return updatedJobs;
    });

  const updateJobType = (jobtype: number) => {
    if (jobtype >= 0 && jobtype <= 3) {
      setJobType(jobtype);
    } else console.log("Job type index out of range(0~3): " + jobtype);
  };

  return (
    <GeneralContext.Provider
      value={{ jobs, jobType, updateJob, updateJobType }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;