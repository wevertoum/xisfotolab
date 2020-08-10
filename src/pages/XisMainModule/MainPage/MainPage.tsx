import React from "react";
import "./MainPage.less";

import PageContainer from "components/PageContainer";
import Button from "antd/lib/button";
import Steps from "components/Steps";

const MainPage: React.FC = () => {
  return (
    <PageContainer title="Bem vindo">
      <Steps />
    </PageContainer>
  );
};

export default MainPage;
