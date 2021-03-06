import React, { memo, useContext, useState, useCallback } from "react";
import "./PedidoPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Button, Col, Form, Modal, Result, Row, Space } from "antd";
import StepPessoais from "components/StepItens/StepPessoais";
import StepPedido from "components/StepItens/StepPedido";
import StepEntrega from "components/StepItens/StepEntrega";
import StepFotos from "components/StepItens/StepFotos";
import CadastroContext from "contexts/CadastroContext";
import StepCheckup from "components/StepItens/StepCheckup";
import FadeLoading from "components/FadeLoading";
import { collection } from "utils/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const PedidoPage: React.FC = () => {
  const history = useHistory();
  const [formCadatro] = Form.useForm();
  const { fileList, clienteEmail, descricao, valorTotal } = useContext(
    CadastroContext
  );
  const [loading, setLoading] = useState(false);
  const navigate = useCallback(() => history.replace(`/avaliacao`), [history]);

  const salvarPedido = useCallback(async (payload: any) => {
    const pedidosRef = collection("pedidos-solicitados");
    const pedido = {
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
          valor_pedido: valorTotal,
          descricao,
        });
        const modal = Modal.success({
          title: "Sucesso! Recebemos seu pedido",
          centered: true,
          okButtonProps: {
            style: {
              display: "none",
            },
          },
          cancelButtonProps: {
            style: {
              display: "none",
            },
          },
          okText: "Concluir",
          content: (
            <>
              <Space direction="vertical">
                <small>Que tals nos avaliar?</small>
                <Row gutter={16}>
                  <Col span={12}>
                    <Button
                      type="link"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Não, já terminei
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate();
                        modal.destroy();
                      }}
                    >
                      Sim! Gostaria
                    </Button>
                  </Col>
                </Row>
              </Space>
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
        <StepEntrega />
        <StepFotos />
        <StepPedido />
        <StepCheckup />
      </Steps>
    </PageContainer>
  );
};

export default memo(PedidoPage);
