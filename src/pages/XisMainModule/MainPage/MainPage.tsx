import React, { memo, useContext, useState, useCallback } from "react";
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
import { collection } from "../../../utils/firebase";
import firebase from "firebase";

const MainPage: React.FC = () => {
  const [formCadatro] = Form.useForm();
  const { fileList, clienteEmail } = useContext(CadastroContext);
  const [loading, setLoading] = useState(false);

  const salvarPedido = useCallback(async (payload: any) => {
    const pedido: any = {
      ...payload,
      data_pedido: firebase.firestore.Timestamp.now(),
    };
    await collection("pedidos-solicitados").add({ ...pedido });
  }, []);

  const submitTask = (values: Models.FileLocal[]) => {
    try {
      setLoading(true);
      message.success("Pedido enviado com sucesso");
      salvarPedido({
        ...values,
        fotografias: fileList,
        email: clienteEmail,
        quantidade_fotos: fileList.length,
      });
    } catch (err) {
      message.error("Algo deu errado :/");
    } finally {
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 4000);
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
