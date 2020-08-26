import React, { memo, useContext, useState, useCallback } from "react";
import "./PedidoPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form, Modal, Result } from "antd";
import StepPessoais from "components/StepPessoais";
import StepPedido from "components/StepPedido";
import StepEntrega from "components/StepEntrega";
import StepFotos from "components/StepFotos";
import CadastroContext from "contexts/CadastroContext";
import StepCheckup from "components/StepCheckup";
import FadeLoading from "components/FadeLoading";
import { collection } from "../../../utils/firebase";
import firebase from "firebase";

const PedidoPage: React.FC = () => {
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

  const submitTask = async (values: Models.FileLocal[]) => {
    try {
      setLoading(true);
      await salvarPedido({
        ...values,
        fotografias: fileList,
        email: clienteEmail,
        quantidade_fotos: fileList.length,
      });
      Modal.success({
        centered: true,
        onOk: () => window.location.reload(),
        content: (
          <>
            <Result
              status="success"
              title="Tudo certo!"
              subTitle="Já recebemos seu pedido, logo entraremos em contato."
            />
          </>
        ),
      });
    } catch (err) {
      Modal.error({
        centered: true,
        content: (
          <>
            <Result
              status="500"
              title="500"
              subTitle="Ops! Algo deu errado :/"
            />
          </>
        ),
      });
    } finally {
      setLoading(false);
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

export default memo(PedidoPage);
