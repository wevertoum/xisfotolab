import React, { HTMLProps, useMemo, memo } from "react";
import "./Display.less";

import { Tag } from "antd";

type Props = HTMLProps<HTMLDivElement> & {
  children: [
    string,
    string | string[] | number | React.ReactFragment | undefined
  ];
  skipBold?: boolean;
  greyText?: boolean;
  color?: string;
};

const Display: React.FC<Props> = ({
  children,
  skipBold = false,
  greyText = false,
  color,
  ...props
}) => {
  const [label, value] = useMemo(() => children, [children]);
  const isTagList = useMemo(() => value instanceof Array, [value]);

  if (!value) {
    return <></>;
  }

  return (
    <article {...props} className={`omni-text-display ${props.className}`}>
      <p className="omni-text-display-label">{label}</p>
      {isTagList ? (
        (value as string[]).map((name, index) => (
          <Tag
            key={index}
            style={{
              color: "var(--primary-color)",
              margin: "2px",
            }}
            color={color}
          >
            {name}
          </Tag>
        ))
      ) : (
        <p
          className={`omni-text-display-value${skipBold ? "-no-bold" : ""}`}
          style={{ color: greyText ? "#999" : "initial" }}
        >
          {value}
        </p>
      )}
    </article>
  );
};

export default memo(Display);
