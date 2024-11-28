import { Link } from "react-router-dom";

function Calculations() {
  return (
    <div className="tw-flex tw-flex-col tw-justify-around tw-border tw-h-96">
      <h1>Calculations:</h1>
      <h5>Jobs: </h5>
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
