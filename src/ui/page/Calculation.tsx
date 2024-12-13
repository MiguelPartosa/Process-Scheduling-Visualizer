import { Link } from "react-router-dom";
import { useContext } from "react";
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

const Calculations = () => {
  const { jobs, jobType } = useContext(GeneralContext) as GeneralContextType;
  const inputJobs = {
    ...jobs,
    jobDetails: jobs.jobDetails.slice(0, jobs.totalJobs),
  };
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
    <div className="tw-self-center tw-border-green-600 tw-border tw-max-w-xl tw-h-96">
      <>
        <div className="tw-flex tw-flex-col tw-justify-around tw-border tw-h-96">
          <h1>Calculations</h1>
          <h5>
            JobType:{" "}
            {(() => {
              return jobType;
            })()}
          </h5>
          <Link to="/">
            <div className="tw-cursor-pointer tw-bg-slate-500 tw-text-slate-200 tw-font-bold tw-py-1 tw-px-6 tw-rounded-full tw-text-lg">
              Return & Change Values
            </div>
          </Link>

          <div>Algorithm</div>
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
          </table>
          <JobChart jobs={calculatedJobs} />
          <div className="tw-border tw-h-14"> Box</div>
        </div>
      </>
    </div>
  );
};

export default Calculations;
