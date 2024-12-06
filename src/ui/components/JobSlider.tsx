import { useContext } from "react";
import {
  GeneralContext,
  GeneralContextType,
} from "../store/globalStateProvider";

const JobSlider = () => {
  const {
    jobs: { jobTime },
    updateJob,
  } = useContext(GeneralContext) as GeneralContextType;
  const totalJobs = jobTime.filter((job) => job !== -1).length;
  return (
    <div className="tw-flex tw-flex-col tw-my-4 tw-h-24 tw-border tw-min-h-24">
      <div className="tw-flex  tw-justify-between tw-w-52 tw-self-center tw-font-semibold">
        <label className="tw-text-lg">Jobs</label>
        <label className="tw-text-left tw-text-gray-500 tw-font-light tw-text-xs tw-self-center">
          Number of jobs
        </label>
      </div>
      <div className="tw-relative tw-mb-2 tw-w-52">
        <input
          name="jobs"
          type="range"
          min="1"
          max="5"
          defaultValue={totalJobs}
          className="tw-w-full tw-appearance-none tw-accent-gray-600 tw-ease-in-out tw-delay-10 tw-duration-500 focus:tw-accent-white  tw-bg-gray-700 hover:tw-bg-gray-900 tw-h-2 hover:tw-accent-slate-500 tw-mt-2 tw-shadow-lg tw-shadow-gray-900 tw-cursor-pointer tw-rounded-full"
          onChange={(e) => updateJob(Number(e.target.value) - 1)}
        />
        {/* Numbers */}
        <div className="tw-text-sm tw-text-gray-300 dark:text-gray-400 tw-flex tw-justify-between tw-flex-row tw-w-full">
          {Array.from({ length: 5 }, (_, index) => {
            return index + 1 == totalJobs ? (
              <span
                key={index}
                className="tw-bg-neutral-800 tw-shadow-md tw-shadow-gray-900 tw-scale-150 tw-ease-in-out tw-font-semibold tw-duration-300 tw-transition-all tw-rounded-md tw-translate-y-1 tw-px-1"
              >
                {index + 1}
              </span>
            ) : (
              <span
                key={index}
                className="tw-ease-in tw-font-semibold tw-text-xs tw-duration-500 tw-transition-all"
              >
                {index + 1}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobSlider;
