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
import JobSlider from "./components/JobSlider.tsx";
import JobInput from "./components/JobInput.tsx";

export type NavIconProps = {
  IconComponent: React.ComponentType<{ className?: string }>;
  label: string;
  setJob?: () => void;
  className?: string;
};

function App() {
  const { jobs, jobType, updateJobType } = useContext(
    GeneralContext
  ) as GeneralContextType;
  const totalJobs = jobs.filter((num) => num != 0).length;
  const styleActive =
    "tw-shadow-lg tw-bg-slate-500 tw-text-gray-800 tw-rounded-full";
  const activateStyle = (index: number) => {
    return jobType === index ? styleActive : "";
  };
  return (
    <>
      <div>Currently Selected {jobType}</div>
      <div className="container">
        <div className="tw-group tw-min-w-300 tw-flex tw-justify-evenly  tw-w-11/12 tw-py-2 tw-mb-2 hover:tw-bg-neutral-800 tw-rounded-full hover:tw-shadow-2xl tw-transition-all tw-ease-in-out tw-delay-10 tw-duration-500 after:tw-bg-slate-50">
          <NavIconButton
            IconComponent={IconFCFS}
            label="FCFS"
            setJob={() => updateJobType(0)}
            className={activateStyle(0)}
          />
          <NavIconButton
            IconComponent={IconSJN}
            label="SJN"
            setJob={() => updateJobType(1)}
            className={activateStyle(1)}
          />
          <NavIconButton
            IconComponent={IconSRT}
            label="SRT"
            setJob={() => updateJobType(2)}
            className={activateStyle(2)}
          />
          <NavIconButton
            IconComponent={IconRoundRobin}
            label="Round Robin"
            setJob={() => updateJobType(3)}
            className={activateStyle(3)}
          />
        </div>

        <JobSlider />

        <JobInput />

        <div className={`tw-font-thin`}>{totalJobs} number of jobs</div>

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
}

export default App;
