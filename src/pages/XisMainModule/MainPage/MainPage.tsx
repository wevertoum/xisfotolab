import React from "react";
import "./MainPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form } from "antd";
import StepPessoais from "components/StepPessoais";
import StepPedido from "components/StepPedido";
import StepEntrega from "components/StepEntrega";

const MainPage: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <PageContainer title="Bem vindo">
      <Steps form={form}>
        <StepPessoais form={form} />
        <StepPedido form={form} />
        <StepEntrega form={form} />
      </Steps>
    </PageContainer>
  );
};

export default MainPage;
