import React from "react";
import "./FadeLoading.less";

import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  loading: boolean;
  message?: string;
}
export default function ({ loading, message }: Props) {
  if (loading) {
    return (
      <section className="fade-loading">
        <LoadingOutlined className="loading" />
        <div className="message">{message}</div>
      </section>
    );
  } else return <></>;
}
