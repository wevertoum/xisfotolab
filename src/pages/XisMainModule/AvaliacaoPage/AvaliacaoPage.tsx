import React, { memo, useState, useCallback } from "react";
import "./AvaliacaoPage.less";

import PageContainer from "components/PageContainer";
import Steps from "components/Steps";
import { Form, Modal, Result } from "antd";
import FadeLoading from "components/FadeLoading";
import { collection } from "utils/firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import AvaliaForm from "components/AvaliacaoItens/AvaliaForm";

const AvaliacaoPage: React.FC = () => {
  const history = useHistory();
  const [formAvaliacao] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useCallback(() => history.replace(`/pedido`), [history]);

  const salvarAvaliacao = useCallback(async (payload: Models.Avaliacao) => {
    const pedidosRef = collection("avaliacoes");
    const pedido = {
      ...payload,
      data_avaliacao: firebase.firestore.Timestamp.now(),
    };
    const ref = await pedidosRef.add({ ...pedido });
    await pedidosRef.doc(ref.id).update({ id: ref.id });
    return ref;
  }, []);

  const submitTask = async (values: Models.Avaliacao) => {
    try {
      setLoading(true);
      await salvarAvaliacao(values);
      const modal = Modal.success({
        centered: true,
        onOk: () => {
          navigate();
          modal.destroy();
        },
        content: (
          <>
            <Result
              status="success"
              title="Tudo certo!"
              subTitle="Obrigado por nos avaliar! Seu feedback é muito importante pra gente."
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
    <PageContainer title="Nos avalie">
      <FadeLoading loading={loading} />
      <Steps
        initialValues={
          {
            avaliacao_sistema: {
              stars: 0,
              feedback: "",
            },
            avaliacao_xis: {
              stars: 0,
              feedback: "",
            },
          } as Models.Avaliacao
        }
        form={formAvaliacao}
        onComplete={(values: Models.Avaliacao) => submitTask(values)}
      >
        <AvaliaForm
          title="Como você avalia o serviço da Xis?"
          rootName="avaliacao_xis"
        />
        <AvaliaForm
          title="Como foi sua experiência ao fazer o pedido pelo site?"
          rootName="avaliacao_sistema"
        />
      </Steps>
    </PageContainer>
  );
};

export default memo(AvaliacaoPage);
