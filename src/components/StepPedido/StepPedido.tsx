import React, { memo } from "react";
import "./StepPedido.less";
import { Form, Input, Popover, Button } from "antd";
import defaultFormRules from "utils/defaultFormRules";
import { FileFilled } from "@ant-design/icons";

const StepPedido: React.FC = () => {
  const content = (
    <div>
      <p>Quantidade de fotos</p>
      <p>Com um sem íma</p>
      <p>Cor das bordas</p>
      <p>Se vai optar por legenda</p>
      <p>Mais algum produto etc</p>
    </div>
  );

  return (
    <>
      <h3>Detalhes do pedido</h3>
      <Form.Item
        label="Detalhes do pedido"
        name="descricao"
        rules={defaultFormRules}
      >
        <Input.TextArea rows={4} placeholder="insira a descrição do pedido" />
      </Form.Item>
      <div className="popover-detalhes">
        <Popover content={content} title="Precisamos saber..." trigger="click">
          <Button type="primary" icon={<FileFilled />} size="middle">
            Que tipo de detalhes?
          </Button>
        </Popover>
      </div>
    </>
  );
};

export default memo(StepPedido);
