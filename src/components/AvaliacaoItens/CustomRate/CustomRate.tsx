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

const CustomRate: React.FC<RateProps> = (props) => {
  return (
    <Rate
      {...props}
      character={({ index }: any) => {
        return customIcons[index];
      }}
    />
  );
};

export default memo(CustomRate);
