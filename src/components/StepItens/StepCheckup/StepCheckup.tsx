import React, { memo, useContext } from "react";
import "./StepCheckup.less";
import { Tag, Card, Row, Col } from "antd";
import CadastroContext from "contexts/CadastroContext";
import Display from "components/Display";
import CheckList from "icons/CheckList";

const StepCheckup: React.FC = () => {
  const {
    fileList,
    clienteEmail,
    detalheEntrega,
    telefoneCliente,
  } = useContext(CadastroContext);

  return (
    <>
      <h3>Confira alguns dados e confirme o pedido</h3>
      <div className="image-check">
        <CheckList size={100} />
      </div>

      <Card className="display-card-check">
        <Row gutter={16}>
          <Col span={24}>
            <Display>
              E-mail
              {<Tag color="orange">{clienteEmail || "seu email"}</Tag>}
            </Display>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Display>
              Telefone
              {<Tag color="orange">{telefoneCliente || "seu telefone"}</Tag>}
            </Display>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Display>
              Quantidade
              {<Tag color="orange">{fileList.length}</Tag>}
            </Display>
          </Col>

          <Col span={12}>
            <Display>
              Tipo de entrega
              {<Tag color="orange">{detalheEntrega || "tipo de entrega"}</Tag>}
            </Display>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default memo(StepCheckup);
