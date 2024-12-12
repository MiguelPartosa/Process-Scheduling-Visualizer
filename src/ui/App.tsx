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
import Calc from "./tempCalc.tsx";

export type NavIconProps = {
  IconComponent: React.ComponentType<{ className?: string }>;
  label: string;
  setJob?: () => void;
  className?: string;
};

function App() {
  const { jobType, updateJobType, randomizeValues } = useContext(
    GeneralContext
  ) as GeneralContextType;
  const styleActive =
    "tw-shadow-lg tw-bg-slate-500 tw-text-gray-800 tw-rounded-full";
  const activateStyle = (index: number) => {
    return jobType === index ? styleActive : "";
  };
  return (
    <>
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

        <div className="tw-flex tw-flex-row  tw-w-64 tw-justify-between tw-mt-auto tw-mb-6 tw-py-3 tw-items-center tw-px-3">
          <div
            className="tw-cursor-pointer tw-bg-slate-400 tw-text-gray-800 tw-font-bold tw-px-1 tw-rounded-sm tw-h-10 tw-text-sm tw-self-center tw-w-24 tw-scale-75"
            onClick={() => {
              randomizeValues(false);
            }}
          >
            Randomize Jobs
          </div>
          <Link
            to="/Calculations"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div className="tw-cursor-pointer tw-bg-slate-500 tw-text-slate-200 tw-font-bold tw-py-1 tw-px-6 tw-rounded-full tw-text-lg">
              Calculate
            </div>
          </Link>
        </div>
      </div>
      <Calc />
    </>
  );
}

export default App;
