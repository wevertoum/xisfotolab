/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./NotFoundPage.less";
import { Result, Button, Space } from "antd";
import { useHistory } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  const navigate = () => {
    history.replace("/login");
  };

  return (
    <>
      <Space
        direction="horizontal"
        align="center"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          position: "absolute"
        }}
      >
        <Result
          status="404"
          title="Oops!"
          subTitle="A página que você tentou acessar não está disponível."
          extra={
            <Button onClick={navigate} type="primary">
              Voltar
            </Button>
          }
        />
      </Space>
    </>
  );
};

export default NotFoundPage;
