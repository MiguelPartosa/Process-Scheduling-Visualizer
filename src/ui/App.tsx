// import { useState, useRef } from "react";
// import "./Globals.css";
import "./App.css";
import "./index.css";
import {
  IconFCFS,
  IconRoundRobin,
  IconSRT,
  IconSJN,
} from "./assets/icons/NavIcons.tsx";

import {
  GeneralContext,
  GeneralContextType,
} from "./store/globalStateProvider";

import { useContext } from "react";
import { NavIconButton } from "./components/NavIconButton.tsx";
import { Link } from "react-router-dom";

export type NavIconProps = {
  IconComponent: React.ComponentType<{ className?: string }>;
  label: string;
  setJob?: () => void;
  className?: string;
};

function App() {
  const { jobs, jobType, updateJob, updateJobType, changeJobDuration } =
    useContext(GeneralContext) as GeneralContextType;
  const totalJobs = jobs.filter((num) => num != 0).length;

  // const [jobsTime, setJobsTime] = useState([]);

  const styleActive =
    "tw-shadow-lg tw-bg-slate-500 tw-text-gray-800 tw-rounded-full";
  return (
    <>
      <div>Currently Selected {jobType}</div>
      <div className="container">
        <div className="tw-group tw-min-w-300 tw-flex tw-justify-evenly  tw-w-11/12 tw-py-2 tw-mb-2 hover:tw-bg-neutral-800 tw-rounded-full hover:tw-shadow-2xl tw-transition-all tw-ease-in-out tw-delay-10 tw-duration-500 after:tw-bg-slate-50">
          <NavIconButton
            IconComponent={IconFCFS}
            label="FCFS"
            setJob={() => updateJobType(0)}
            className={jobType === 0 ? styleActive : ""}
          />
          <NavIconButton
            IconComponent={IconSJN}
            label="SJN"
            setJob={() => updateJobType(1)}
            className={jobType === 1 ? styleActive : ""}
          />
          <NavIconButton
            IconComponent={IconSRT}
            label="SRT"
            setJob={() => updateJobType(2)}
            className={jobType === 2 ? styleActive : ""}
          />
          <NavIconButton
            IconComponent={IconRoundRobin}
            label="Round Robin"
            setJob={() => updateJobType(3)}
            className={jobType === 3 ? styleActive : ""}
          />
        </div>

        {/* Job Slider */}
        {JobSlider()}

        {/* Jobs Input */}
        {JobInput()}

        <div className={`tw-font-thin`}>{totalJobs} number of jobs</div>
        <div className="main-buttons"></div>
        <div className="tw-flex tw-flex-row tw-border tw-w-64 tw-justify-between tw-mt-auto tw-mb-6 tw-py-3 tw-items-center">
          <div className="tw-cursor-pointer tw-bg-slate-400 tw-text-gray-800 tw-font-bold tw-px-1 tw-rounded-sm tw-h-6 tw-text-sm tw-self-center">
            Reset Values
          </div>
          <Link to="/Calculations">
            <div className="tw-cursor-pointer tw-bg-slate-500 tw-text-slate-200 tw-font-bold tw-py-1 tw-px-6 tw-rounded-full tw-text-lg">
              Calculate
            </div>
          </Link>
        </div>
      </div>
    </>
  );

  function JobInput() {
    const alphabets = ["A", "B", "C", "D", "E"];
    return (
      <div className="tw-flex tw-gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div className="">
            <div className="tw-flex tw-flex-col">
              <label className="tw-font-semibold">
                {" "}
                Job {alphabets[index]}
              </label>
              <input
                type="number"
                className="tw-bg-gray-950 tw-shadow-inner tw-border tw-border-gray-400 tw-rounded-md tw-indent-2 tw-text-slate-300 tw-w-10 tw-font-black "
                placeholder="1+"
                min={1}
                value={jobs[index]}
                onChange={(e) =>
                  changeJobDuration(Number(e.target.value), index)
                }
                disabled={index >= totalJobs}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function JobSlider() {
    return (
      <div className="tw-flex tw-flex-col tw-my-10 tw-h-24">
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
          <div className="tw-text-sm tw-text-gray-500 dark:text-gray-400 tw-flex tw-justify-between tw-flex-row tw-w-full">
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
  }
}

export default App;
