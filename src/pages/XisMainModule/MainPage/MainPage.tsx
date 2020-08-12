import React from "react";
import "./MainPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form } from "antd";
import StepPessoais from "components/StepPessoais";
import StepPedido from "components/StepPedido";
import StepEntrega from "components/StepEntrega";
import StepFotos from "components/StepFotos";

const MainPage: React.FC = () => {
  const [formCadatro] = Form.useForm();

  return (
    <PageContainer title="Bem vindo">
      <Steps
        form={formCadatro}
        onComplete={(values) => console.log("form geralzao", { values })}
      >
        <StepFotos />
        <StepPessoais />
        <StepPedido />
        <StepEntrega />
      </Steps>
    </PageContainer>
  );
};

export default MainPage;
