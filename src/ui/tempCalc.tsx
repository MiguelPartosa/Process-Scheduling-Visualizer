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

  // let orderOfJobs: JobOrder = { jobLetter: [], jobLength: [] };
  // switch (jobType) {
  //   case 0:
  //     FirstComeFirstServe();
  //     break;

  //   case 1:
  //     ShortestJobNext();
  //     break;

  //   case 2:
  //     ShortestRemainingTime();
  //     break;

  //   case 3:
  //     RoundRobin();
  //     break;

  //   default:
  //     break;
  // }
  return (
    <div className="tw-self-center tw-border-green-600 tw-border tw-max-w-xl tw-h-96">
      <>
        <div>Algorithm</div>
        <div className="tw-border tw-h-14"> Box</div>
      </>
    </div>
  );
};

export default Calc;
function RoundRobin() {
  throw new Error("Function not implemented.");
}

function ShortestRemainingTime() {
  throw new Error("Function not implemented.");
}

function ShortestJobNext() {
  throw new Error("Function not implemented.");
}

function FirstComeFirstServe() {
  throw new Error("Function not implemented.");
}
