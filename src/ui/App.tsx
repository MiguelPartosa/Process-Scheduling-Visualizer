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

type NavIconProps = {
  IconComponent: React.ComponentType<{ className?: string }>;
  label: string;
};

const NavIconButton: React.FC<NavIconProps> = ({ IconComponent, label }) => (
  <div
    className="tw-text-gray-500 hover:tw-text-white tw-font-bold hover:tw-scale-125
               tw-ease-in-out tw-delay-10 tw-duration-500 tw-flex tw-flex-col tw-justify-center tw-w-20"
  >
    <IconComponent className="tw-self-center tw-fill-current" />
    <div className="tw-text-center">{label}</div>
  </div>
);

function App() {
  // const val = window.myAPI;
  return (
    <>
      <div className="container">
        <div
          className="tw-group tw-min-w-300 tw-flex tw-justify-evenly  tw-w-11/12 tw-py-2 tw-mb-2 
                hover:tw-bg-neutral-800 tw-rounded-lg hover:tw-shadow-2xl tw-transition-all 
                tw-ease-in-out tw-delay-10 tw-duration-500"
        >
          <NavIconButton IconComponent={IconFCFS} label="FCFS" />
          <NavIconButton IconComponent={IconSJN} label="SJN" />
          <NavIconButton IconComponent={IconSRT} label="SRT" />
          <NavIconButton IconComponent={IconRoundRobin} label="Round Robin" />
        </div>
        {/* Job Slider */}
        <div className="tw-flex tw-flex-col tw-my-10 tw-border-red-400 tw-border tw-justify-center">
          <div className="tw-flex  tw-justify-between tw-w-52 tw-border tw-font-semibold">
            <text>Jobs</text>
            <text>1-5</text>
          </div>
          <div>Slider</div>
          <div className="tw-text-left tw-text-gray-500 tw-font-light">
            Number of jobs
          </div>
        </div>

        <div className="job-cycles">jobs input</div>
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
