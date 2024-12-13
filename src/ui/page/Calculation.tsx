// import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  AlgorithmType,
  GeneralContext,
  GeneralContextType,
  Job,
} from "../store/globalStateProvider";

import {
  FirstComeFirstServe,
  RoundRobin,
  ShortestJobNext,
  ShortestRemainingTime,
} from "./CalculationAlgorithms";
import JobChart from "./Chart";

type CalculationProps = {
  showCalculation: boolean;
};

export const Calculations: React.FC<CalculationProps> = ({
  showCalculation,
}) => {
  const { jobs, jobType } = useContext(GeneralContext) as GeneralContextType;
  const inputJobs = {
    ...jobs,
    jobDetails: jobs.jobDetails.slice(0, jobs.totalJobs),
  };
  // TODO: fix logic inverse here
  const [inverseShow, setInverseShow] = useState(true);
  let calculatedJobs: Job[];
  switch (jobType) {
    case AlgorithmType.FirstComeFirstServe:
      calculatedJobs = FirstComeFirstServe(inputJobs);
      break;

    case AlgorithmType.ShortestJobNext:
      calculatedJobs = ShortestJobNext(inputJobs);
      break;

    case AlgorithmType.ShortestRemainingTime:
      calculatedJobs = ShortestRemainingTime(inputJobs);
      break;

    case AlgorithmType.RoundRobin:
      calculatedJobs = RoundRobin(inputJobs);
      break;

    default:
      calculatedJobs = [];
      console.error("Unsuported Algorithm Type");
      break;
  }
  return (
    <div
      className={`${
        showCalculation && inverseShow === true
          ? "tw-pacity-100 tw-translate-y-0 tw-p-1 tw-m-0 tw-h-11"
          : "tw-opacity-0 tw--translate-y-5 tw-border-red-500 tw-m-0 tw-p-0 tw-h-0 tw-invisible"
      }
            tw-self-center tw-border-slate-800 tw-shadow-2xl tw-shadow-slate-700 tw-border tw-max-w-xl tw-h-96 tw-bg-gray-900 tw-rounded-3xl`}
    >
      <>
        <div className="tw-flex tw-flex-col tw-justify-around tw-h-96">
          {/* <h1>Calculations</h1> */}
          {/* <h5>
            JobType:{" "}
            {(() => {
              return jobType;
            })()}
          </h5> */}

          {/* Debugging */}
          {/* <div>Algorithm</div>
          <table className="tw-table-fixed">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Job Time</th>
                <th>Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                return Array.from({ length: jobs.totalJobs }, (_, i) => {
                  const job = calculatedJobs[i];
                  if (job === undefined) {
                    console.error("something went wrong");
                  }
                  return job ? (
                    <tr key={i}>
                      <td>{job.jobName}</td>
                      <td>{job.jobTime}</td>
                      <td>{job.arrivalTime}</td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      <td colSpan={3}>Job not found</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table> */}
          <JobChart jobs={calculatedJobs} />
          {/* <Link to="/"> */}
          <div
            className="tw-cursor-pointer tw-bg-slate-500 tw-text-slate-900 tw-font-bold tw-py-1 tw-px-6 tw-rounded-full tw-text-lg tw-w-36 tw-self-center hover:tw-cursor-pointer tw-shadow-lg tw-shadow-black hover:tw-scale-105 tw-transition-all tw-duration-300 tw-ease-in-out"
            onClick={() => {
              setInverseShow((preVal) => !preVal);
            }}
          >
            Hide Chart
          </div>
          {/* </Link> */}
        </div>
      </>
    </div>
  );
};
