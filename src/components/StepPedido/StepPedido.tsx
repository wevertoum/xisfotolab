import React from "react";
import "./StepPedido.less";
import { Form, Input, InputNumber } from "antd";
import defaultFormRules from "utils/defaultFormRules";

const StepPedido: React.FC = () => {
  return (
    <>
      <h3>Agora vamos aos detalhes do pedido</h3>
      <p>Envie as fotos para nosso whats</p>
      <Form.Item
        label="Descrição do pedido"
        name="descricao"
        rules={defaultFormRules}
      >
        <Input.TextArea rows={4} placeholder="insira a descrição do pedido" />
      </Form.Item>
      <Form.Item
        label="Quantidade de fotos"
        name="quantidade_fotos"
        rules={defaultFormRules}
      >
        <InputNumber />
      </Form.Item>
    </>
  );
};

export default StepPedido;
