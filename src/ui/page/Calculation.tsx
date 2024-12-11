import { useContext } from "react";

import { Link } from "react-router-dom";
import {
  GeneralContext,
  GeneralContextType,
} from "../store/globalStateProvider";

function Calculations() {
  const { jobs } = useContext(GeneralContext) as GeneralContextType;
  console.log(jobs);
  return (
    <div className="tw-flex tw-flex-col tw-justify-around tw-border tw-h-96">
      <h1>Calculations:</h1>
      <h5>Jobs: {jobs.jobTime.filter((num) => num !== 0).length}</h5>
      <h5>JobType: </h5>
      <Link to="/">
        <div className="tw-cursor-pointer tw-bg-slate-500 tw-text-slate-200 tw-font-bold tw-py-1 tw-px-6 tw-rounded-full tw-text-lg">
          Return & Change Values
        </div>
      </Link>
    </div>
  );
}

export default Calculations;
