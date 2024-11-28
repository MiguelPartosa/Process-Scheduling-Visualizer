import { NavIconProps } from "../App";

export const NavIconButton: React.FC<NavIconProps> = ({
  IconComponent,
  label,
  setJob,
  className,
}) => (
  <div
    className={`tw-text-gray-500 hover:tw-text-white tw-font-bold hover:tw-scale-125 tw-ease-in-out tw-delay-10 tw-duration-500 tw-flex tw-flex-col tw-justify-center tw-w-20 hover:tw-cursor-pointer ${className}`}
    onClick={setJob}
  >
    <IconComponent className="tw-self-center tw-fill-current" />
    <div className="tw-text-center">{label}</div>
  </div>
);
