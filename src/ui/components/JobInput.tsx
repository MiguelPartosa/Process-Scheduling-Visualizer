import { useContext } from "react";
import {
  GeneralContext,
  GeneralContextType,
} from "../store/globalStateProvider";
const ALPHABETS = ["A", "B", "C", "D", "E"];

const JobInput = () => {
  const { jobs, changeJobDuration, changeArrivalTime, jobType } = useContext(
    GeneralContext
  ) as GeneralContextType;

  const totalJobs = jobs.jobTime.filter((job) => job !== -1).length;

  /**
   *  Returns cells that correspond to input based on string argument "jobArrival" or "job"
   *
   * @param {string} type
   * @return {*}
   */
  const inputCells = (type: string) => {
    let min: number;
    // jobs.jobTime or jobs.arrivalTime
    let valueStatus: Array<number>;
    let changeValue: (value: number, index: number) => void;
    if (type === "jobArrival") {
      min = 0;
      valueStatus = jobs.arrivalTime;
      changeValue = changeArrivalTime;
    } else if (type === "job") {
      min = 1;
      valueStatus = jobs.jobTime;
      changeValue = changeJobDuration;
    } else {
      return <div>Error, either jobarrival or job</div>;
    }
    return (
      <div className="tw-flex-row tw-flex">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            <div className="tw-flex tw-flex-col   tw-p-2 tw-py-0 tw-m-2">
              <label
                className={`${
                  index >= totalJobs ? "tw-text-slate-600" : ""
                } tw-font-semibold tw-transition-all tw-ease-in-out tw-duration-500`}
              >
                {ALPHABETS[index]}
              </label>
              <input
                type="number"
                className={`${
                  index >= totalJobs
                    ? "tw-text-slate-600 tw-border-slate-700 "
                    : ""
                } tw-bg-gray-950 tw-shadow-inner tw-border tw-border-gray-500 tw-rounded-md tw-indent-2 tw-text-slate-300 tw-w-10 tw-font-black focus:tw-text-slate-50`}
                placeholder="∅"
                min={min}
                value={valueStatus[index] === -1 ? "" : valueStatus[index]}
                onChange={(e) => changeValue(Number(e.target.value), index)}
                disabled={index >= totalJobs}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-text-left tw-text-gray-500 tw-font-medium tw-text-sm tw-pl-7">
        Job Cycle
      </div>

      {inputCells("job")}
      <div className="tw-text-left tw-text-gray-500 tw-font-medium tw-text-sm tw-pl-7 tw-mt-4">
        Job Arrival Time
      </div>
      {inputCells("jobArrival")}

      {/* Shows Round Robin Time Quantum */}
      <div
        className={`${
          jobType === 3
            ? "tw-pacity-100 tw-translate-y-0 tw-p-1 tw-m-0 tw-h-11"
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
