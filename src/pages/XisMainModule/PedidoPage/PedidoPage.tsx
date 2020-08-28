import React, { memo, useContext, useState, useCallback } from "react";
import "./PedidoPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form, Modal, Result } from "antd";
import StepPessoais from "components/StepItens/StepPessoais";
import StepPedido from "components/StepItens/StepPedido";
import StepEntrega from "components/StepItens/StepEntrega";
import StepFotos from "components/StepItens/StepFotos";
import CadastroContext from "contexts/CadastroContext";
import StepCheckup from "components/StepItens/StepCheckup";
import FadeLoading from "components/FadeLoading";
import { collection } from "utils/firebase";
import firebase from "firebase";

const PedidoPage: React.FC = () => {
  const [formCadatro] = Form.useForm();
  const { fileList, clienteEmail } = useContext(CadastroContext);
  const [loading, setLoading] = useState(false);

  const salvarPedido = useCallback(async (payload: any) => {
    const pedidosRef = collection("pedidos-solicitados");
    const pedido: any = {
      ...payload,
      data_pedido: firebase.firestore.Timestamp.now(),
    };
    const ref = await pedidosRef.add({ ...pedido });
    await pedidosRef.doc(ref.id).update({ id: ref.id });
    return ref;
  }, []);

  const submitTask = async (values: Models.FileLocal[]) => {
    try {
      setLoading(true);
      if (fileList.length > 0) {
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
      } else {
        Modal.warning({
          centered: true,
          content: (
            <>
              <Result
                status="500"
                title="Ops! Só mais uma coisa"
                subTitle="Precisamos que você mande pelo menos uma foto pra fazer o pedido :)"
              />
            </>
          ),
        });
      }
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
