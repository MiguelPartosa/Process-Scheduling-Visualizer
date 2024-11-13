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
};

const NavIconButton: React.FC<NavIconProps> = ({
  IconComponent,
  label,
  setJob,
}) => (
  <div
    className="tw-text-gray-500 hover:tw-text-white tw-font-bold hover:tw-scale-125
               tw-ease-in-out tw-delay-10 tw-duration-500 tw-flex tw-flex-col tw-justify-center tw-w-20 hover:tw-cursor-pointer"
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
        <div
          className="tw-group tw-min-w-300 tw-flex tw-justify-evenly  tw-w-11/12 tw-py-2 tw-mb-2 
                hover:tw-bg-neutral-800 tw-rounded-lg hover:tw-shadow-2xl tw-transition-all 
                tw-ease-in-out tw-delay-10 tw-duration-500"
        >
          <NavIconButton
            IconComponent={IconFCFS}
            label="FCFS"
            setJob={() => setJobType(0)}
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
        <div className="tw-flex tw-flex-col tw-my-10 tw-border-red-400 tw-border tw-justify-center">
          <div className="tw-flex  tw-justify-between tw-w-52 tw-border tw-font-semibold">
            <text>Jobs</text>
            <text>1-5</text>
          </div>
          <div className="tw-relative tw-mb-6">
            <input
              name="jobs"
              type="range"
              min="1"
              max="5"
              defaultValue={jobs}
              className="tw-w-full tw-appearance-none tw-accent-gray-600 tw-ease-in-out tw-delay-10 tw-duration-500 focus:tw-accent-white  tw-bg-gray-300 tw-h-2 tw-mt-2 tw-shadow-inner tw-cursor-pointer tw-rounded-full "
              onChange={(e) => setJobs(e.target.value)}
            />
            <div className="tw-text-sm tw-text-gray-500 dark:text-gray-400 tw-flex tw-justify-between tw-flex-row tw-w-full tw-border">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>
          </div>
          <div className="tw-text-left tw-text-gray-500 tw-font-light">
            Number of jobs
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
