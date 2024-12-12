import { useContext } from "react";
import {
  GeneralContext,
  GeneralContextType,
} from "./store/globalStateProvider";

type JobOrder = {
  jobLetter: Array<string>;
  jobLength: Array<number>;
};

const Calc = () => {
  const { jobs, jobType } = useContext(GeneralContext) as GeneralContextType;

  let orderOfJobs: JobOrder = { jobLetter: [], jobLength: [] };
  const jobList = { jobLetter: ["A", "B", "C"], jobLength: [1, 5, 3] };
  switch (jobType) {
    case 0:
      FirstComeFirstServe();
      break;

    case 1:
      ShortestJobNext();
      break;

    case 2:
      ShortestRemainingTime();
      break;

    case 3:
      RoundRobin();
      break;

    default:
      break;
  }

  function RoundRobin() {
    console.log("Function not implemented.");
  }

  function ShortestRemainingTime() {
    console.log("Function not implemented.");
  }

  function ShortestJobNext() {
    console.log("Function not implemented.");
  }

  function FirstComeFirstServe() {
    console.log("First Cum");
  }

  return (
    <div className="tw-self-center tw-border-green-600 tw-border tw-max-w-xl tw-h-96">
      <>
        <div>Algorithm</div>
        <table className="tw-table-fixed">
          <thead>
            <tr>
              <th>Job Letter</th>
              <th>Job Length</th>
            </tr>
          </thead>
          <tbody>
            {jobList.jobLetter.map((_, index) => (
              <tr key={index}>
                <td>{jobList.jobLetter[index]}</td>
                <td>{jobList.jobLength[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="tw-border tw-h-14"> Box</div>
      </>
    </div>
  );
};

export default Calc;
