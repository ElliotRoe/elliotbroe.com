import * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export const TailwindIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        width="15px"
        height="15px"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>file_type_tailwind</title>
          <path
            d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z"
            fill="#000000"
          ></path>
        </g>
      </svg>
    );
  }
);

TailwindIcon.displayName = "ArchiveIcon";

export default TailwindIcon;
