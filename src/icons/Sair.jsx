import React from "pages/XisMainModule/AgendaPage/node_modules/react";

function Icon({ color = "white", size = 50 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      x="0"
      y="0"
      version="1.1"
      viewBox={`0 0 50 50`}
      xmlSpace="preserve"
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="18"
        transform="matrix(.17611 0 0 .17611 -121.976 -123.512)"
      >
        <path d="M885 879.999v44c0 39.063-39.221 38.572-44 38.576-84.915.071-88.058-.095-95.338-.095-50.667 0-43.654-53.025-43.667-66.998-.031-31.668 0-68.334 0-129.001 0-20-.323-42.333 47.5-42.333H830c34.33 0 55.054-3.481 55 36.852-.015 11.406-.309 23.484 0 43"></path>
        <path d="M748 843.314L967 843.314"></path>
        <path d="M922.017 791.485S967.5 841 967.5 843.539c0 4.203-45.483 59.461-45.483 59.461"></path>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
