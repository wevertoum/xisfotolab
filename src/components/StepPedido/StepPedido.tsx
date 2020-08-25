import React, { memo } from "react";
import "./StepPedido.less";
import { Form, Input } from "antd";
import defaultFormRules from "utils/defaultFormRules";

const StepPedido: React.FC = () => {
  return (
    <>
      <h3>Detalhes do pedido</h3>
      <Form.Item
        label="Descrição do pedido"
        name="descricao"
        rules={defaultFormRules}
      >
        <Input.TextArea rows={4} placeholder="insira a descrição do pedido" />
      </Form.Item>
    </>
  );
};

export default memo(StepPedido);
