import React from "react";
import "./StepPedido.less";
import { Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";

interface Props {
  form: FormInstance;
}

const StepPedido: React.FC<Props> = ({ form }) => {
  return (
    <>
      <h3>Vamos começar com seus dados :)</h3>

      <h3>Agora vamos aos detalhes do pedido</h3>
      <p>Envie as fotos para nosso whats</p>

      <Form.Item label="Descrição do pedido" name="descricao">
        <Input.TextArea rows={4} placeholder="insira a descrição do pedido" />
      </Form.Item>
      <Form.Item label="Quantidade de fotos" name="quantidade_fotos">
        <InputNumber />
      </Form.Item>
    </>
  );
};

export default StepPedido;
