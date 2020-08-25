import React, { memo, useContext, useState } from "react";
import "./MainPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form, message } from "antd";
import StepPessoais from "components/StepPessoais";
import StepPedido from "components/StepPedido";
import StepEntrega from "components/StepEntrega";
import StepFotos from "components/StepFotos";
import CadastroContext from "contexts/CadastroContext";
import StepCheckup from "components/StepCheckup";
import FadeLoading from "components/FadeLoading";

const MainPage: React.FC = () => {
  const [formCadatro] = Form.useForm();
  const { fileList, clienteEmail } = useContext(CadastroContext);
  const [loading, setLoading] = useState(false);

  const submitTask = (values: Models.FileLocal[]) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        message.success("Pedido enviado com sucesso");
        console.log(
          JSON.stringify({
            ...values,
            fotografias: fileList,
            email: clienteEmail,
            quantidade_fotos: fileList.length,
          })
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 4000);
    } catch (err) {
      setLoading(false);
      message.error("Algo deu errado :/");
    }
  };

  return (
    <PageContainer title="Bem vindo">
      <FadeLoading loading={loading} />
      <Steps
        form={formCadatro}
        onComplete={(values: Models.FileLocal[]) => submitTask(values)}
      >
        <StepPessoais />
        <StepPedido />
        <StepEntrega />
        <StepFotos />
        <StepCheckup />
      </Steps>
    </PageContainer>
  );
};

export default memo(MainPage);
