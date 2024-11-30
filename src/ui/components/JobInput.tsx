import { useContext } from "react";
import {
  GeneralContext,
  GeneralContextType,
} from "../store/globalStateProvider";

const JobInput = () => {
  const { jobs, changeJobDuration, jobType } = useContext(
    GeneralContext
  ) as GeneralContextType;
  const alphabets = ["A", "B", "C", "D", "E"];
  const totalJobs = jobs.jobTime.filter((job) => job !== 0).length;
  return (
    <div className="tw-flex tw-border tw-flex-col">
      <div className="tw-flex-row tw-flex">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            <div className="tw-flex tw-flex-col tw-border-red-700 tw-border tw-p-2 tw-m-2">
              <label
                className={`${
                  jobs.jobTime[index] === 0 ? "tw-text-slate-600" : ""
                } tw-font-semibold tw-transition-all tw-ease-in-out tw-duration-500`}
              >
                {" "}
                Job {alphabets[index]}
              </label>
              <input
                type="number"
                className={`${
                  jobs.jobTime[index] === 0 ? "tw-text-slate-600" : ""
                } tw-bg-gray-950 tw-shadow-inner tw-border tw-border-gray-500 tw-rounded-md tw-indent-2 tw-text-slate-300 tw-w-10 tw-font-black focus:tw-text-slate-50 `}
                placeholder="1+"
                min={1}
                value={jobs.jobTime[index]}
                onChange={(e) =>
                  changeJobDuration(Number(e.target.value), index)
                }
                disabled={index >= totalJobs}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${
          jobType === 3
            ? "tw-pacity-100 tw-translate-y-0 tw-p-2 tw-m-2 tw-h-11"
            : "tw-opacity-0 tw--translate-y-5 tw-border-red-500 tw-m-0 tw-p-0 tw-h-0 tw-invisible"
        } tw-transition-all tw-duration-500 tw-ease-in-out tw-transform `}
      >
        <div>
          <label className="tw-font-semibold">Time Quantum</label>
          <input
            type="number"
            className={`tw-bg-gray-950 tw-shadow-inner tw-border tw-border-gray-500 tw-rounded-md tw-indent-2 tw-text-slate-300 tw-w-10 tw-font-black focus:tw-text-slate-50`}
            placeholder="1+"
            min={1}
            value={jobs.quantumTime}
            onChange={(e) =>
              changeJobDuration(Number(e.target.value), undefined, true)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default JobInput;
