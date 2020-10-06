import React, { memo } from "react";
import "./CustomRate.less";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { RateProps } from "antd/lib/rate";

const customIcons = [
  <FrownOutlined className="custom-rate-icon" />,
  <FrownOutlined className="custom-rate-icon" />,
  <MehOutlined className="custom-rate-icon" />,
  <SmileOutlined className="custom-rate-icon" />,
  <SmileOutlined className="custom-rate-icon" />,
];

type Props = RateProps & {
  value?: number;
  disabled?: boolean;
};

const CustomRate: React.FC<Props> = ({ value, disabled, ...props }) => {
  return (
    <Rate
      value={value}
      disabled={disabled}
      {...props}
      character={({ index }: any) => {
        return customIcons[index];
      }}
    />
  );
};

export default memo(CustomRate);
