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

import { useState } from "react";

type NavIconProps = {
  IconComponent: React.ComponentType<{ className?: string }>;
  label: string;
  setJob?: () => void;
  isActive: boolean;
};

const NavIconButton: React.FC<NavIconProps> = ({
  IconComponent,
  label,
  setJob,
  isActive,
}) => (
  <div
    className="tw-text-gray-500 hover:tw-text-white tw-font-bold hover:tw-scale-125 tw-ease-in-out tw-delay-10 tw-duration-500 tw-flex tw-flex-col tw-justify-center tw-w-20 hover:tw-cursor-pointer ${isActive ? 'tw-bg-blue-500 tw-text-white' : 'tw-text-gray-400 hover:tw-bg-neutral-700'"
    onClick={setJob}
  >
    <IconComponent className="tw-self-center tw-fill-current" />
    <div className="tw-text-center">{label}</div>
  </div>
);

function App() {
  const [jobs, setJobs] = useState(1);
  const [jobType, setJobType] = useState(0); // 0 to 4 FCFS to RR

  return (
    <>
      <div>Currently Selected {jobType}</div>
      <div className="container">
        <div className="tw-group tw-min-w-300 tw-flex tw-justify-evenly  tw-w-11/12 tw-py-2 tw-mb-2 hover:tw-bg-neutral-800 tw-rounded-lg hover:tw-shadow-2xl tw-transition-all tw-ease-in-out tw-delay-10 tw-duration-500 after:tw-bg-slate-50">
          <NavIconButton
            IconComponent={IconFCFS}
            label="FCFS"
            setJob={() => setJobType(0)}
            isActive={jobType === 2}
          />
          <NavIconButton
            IconComponent={IconSJN}
            label="SJN"
            setJob={() => setJobType(1)}
          />
          <NavIconButton
            IconComponent={IconSRT}
            label="SRT"
            setJob={() => setJobType(2)}
          />
          <NavIconButton
            IconComponent={IconRoundRobin}
            label="Round Robin"
            setJob={() => setJobType(3)}
          />
        </div>

        {/* Job Slider */}
        <div className="tw-flex tw-flex-col tw-my-10  tw-justify-center ">
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
              defaultValue={jobs}
              className="tw-w-full tw-appearance-none tw-accent-gray-600 tw-ease-in-out tw-delay-10 tw-duration-500 focus:tw-accent-white  tw-bg-gray-700 hover:tw-bg-gray-900 tw-h-2 hover:tw-accent-slate-500 tw-mt-2 tw-shadow-lg tw-shadow-gray-900 tw-cursor-pointer tw-rounded-full"
              onChange={(e) => setJobs(e.target.value)}
            />
            <div className="tw-text-sm tw-text-gray-500 dark:text-gray-400 tw-flex tw-justify-between tw-flex-row tw-w-full">
              {Array.from({ length: 5 }, (_, index) => {
                return index + 1 == jobs ? (
                  <span
                    key={index}
                    className="tw-bg-neutral-800 tw-shadow-md tw-shadow-gray-900 tw-scale-150 tw-ease-in-out  tw-duration-300 tw-transition-all tw-rounded-md tw-translate-y-1"
                  >
                    {index + 1}
                  </span>
                ) : (
                  <span
                    key={index}
                    className="tw-ease-in tw-delay-150 tw-transition-all"
                  >
                    {index + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="job-cycles">jobs input</div>
        <div className="job-cycles">{jobs} number of jobs</div>
        <div className="main-buttons"></div>
        <div className="tw-flex tw-flex-row tw-border tw-w-72 tw-justify-between tw-mt-auto tw-mb-12">
          <div>Reset Values</div>
          <div> Calculate</div>
        </div>
      </div>
    </>
  );
}

export default App;
