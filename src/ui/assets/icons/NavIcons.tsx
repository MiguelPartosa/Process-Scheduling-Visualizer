const createIcon =
  (path) =>
  ({ className = "", ...props }) =>
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        width="24px"
        className={className}
        viewBox="0 -960 960 960"
        {...props}
      >
        <path d={path} />
      </svg>
    );

const IconFCFS = createIcon(
  "M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z"
);

const IconRoundRobin = createIcon(
  "m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"
);

const IconSJN = createIcon(
  "m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
);

const IconSRT = createIcon(
  "M360-840v-80h240v80H360ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Zm-80 160 240-160-240-160v320Z"
);

export { IconFCFS, IconRoundRobin, IconSRT, IconSJN };
