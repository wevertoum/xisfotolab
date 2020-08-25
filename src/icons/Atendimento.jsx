import React from "react";

function Icon({ size = 150 }) {
  return (
    <svg
      id="Capa_1"
      enable-background="new 0 0 512.002 512.002"
      height={size}
      width={size}
      viewBox="0 0 512.002 512.002"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m477.73 255.924-37.402-62.273c-1.487-2.519-3.743-3.764-5.374-4.327l-137.278-46.354c-.367-.124-.737-.225-1.107-.305l-9 9.976 9 11.065 103.928 35.093-144.496 48.793-144.497-48.793 103.929-35.093 10-11.269-10-9.735c-.459.086-.918.204-1.374.358l-137.011 46.264c-2.253.761-3.842 1.901-5.349 4.285-.008.014-37.427 62.314-37.427 62.314-2.034 3.387-1.925 7.745.53 11.1 1.187 1.622 2.891 2.792 4.771 3.502l30.673 11.591v160.535c0 4.29 2.736 8.102 6.801 9.475l175.754 59.348.129.042c.011.003.021.007.032.01 1.988.638 4.126.633 6.112-.012l.126-.041 175.754-59.348c4.065-1.373 6.801-5.185 6.801-9.475v-160.533l30.673-11.591c1.88-.71 3.584-1.881 4.771-3.502 2.457-3.355 2.566-7.714.531-11.1zm-420.145.028 27.089-45.104 153.715 51.906-41.348 45.895zm188.416 232.116-155.754-52.593v-145.8l106.117 40.099c1.151.436 2.348.646 3.533.646 2.78 0 5.498-1.16 7.432-3.307l38.673-42.926v203.881zm175.755-52.593-155.754 52.594v-203.883l38.673 42.926c1.934 2.146 4.651 3.307 7.432 3.307 1.185 0 2.381-.211 3.533-.646l106.117-40.099v145.801zm-106.796-126.826-41.348-45.895 153.715-51.906 27.089 45.104z"
          fill="#d6710f"
        />
      </g>
      <g>
        <g>
          <path
            d="m347.541 121.629-91.54-121.629-91.54 121.629h50.972v76.989h81.136v-76.989z"
            fill="#fec0c5"
          />
        </g>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
