import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  AlgorithmType,
  GeneralContext,
  GeneralContextType,
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

  switch (jobType) {
    case AlgorithmType.FirstComeFirstServe:
      FirstComeFirstServe(jobs, jobType);
      break;

    case AlgorithmType.ShortestJobNext:
      ShortestJobNext();
      break;

    case AlgorithmType.ShortestRemainingTime:
      ShortestRemainingTime();
      break;

    case AlgorithmType.RoundRobin:
      RoundRobin();
      break;

    default:
      break;
  }
  return (
    <div className="tw-self-center tw-border-green-600 tw-border tw-max-w-xl tw-h-96">
      <>
        <div className="tw-flex tw-flex-col tw-justify-around tw-border tw-h-96">
          <h1>Calculations</h1>
          <h5>
            Jobs:{" "}
            {(() => {
              return Array.from({ length: jobs.totalJobs }, (_, i) => (
                <div key={i}>
                  <br></br>
                  {jobs.jobDetails[i].jobName}&nbsp;
                  {jobs.jobDetails[i].jobTime}&nbsp;
                  {jobs.jobDetails[i].arrivalTime}
                </div>
              ));
            })()}
          </h5>
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
                return Array.from({ length: jobs.totalJobs }, (_, i) => (
                  <tr key={i}>
                    <td>{jobs.jobDetails[i].jobName}</td>
                    <td>{jobs.jobDetails[i].jobTime}</td>
                    <td>{jobs.jobDetails[i].arrivalTime}</td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
          <JobChart jobs={jobs.jobDetails.slice(0, jobs.totalJobs)} />
          <div className="tw-border tw-h-14"> Box</div>
        </div>
      </>
    </div>
  );
};

export default Calculations;
