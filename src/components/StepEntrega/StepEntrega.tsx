import React from "react";
import "./StepEntrega.less";
import { Form, Input, Select, InputNumber } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FormInstance } from "antd/lib/form";

interface Props {
  form: FormInstance;
}

const StepEntrega: React.FC<Props> = ({ form }) => {
  return (
    <>
      <h3>Vamos começar com seus dados :)</h3>
      <h3>Agora vamos aos detalhes da entrega</h3>
      <Form.Item name="detalhes_entrega" label="Detalhes da entrega">
        <Select placeholder="Selecione um tipo de entrega!">
          <Select.Option value="correios">Correios</Select.Option>
          <Select.Option value="retirada">Retirada</Select.Option>
          <Select.Option value="entrega_gyn">Entrega em Goiânia</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Rua" name={["endereco", "rua"]}>
        <Input placeholder="insira seu nome completo" />
      </Form.Item>
      <Form.Item label="CEP" name={["endereco", "cep"]}>
        <MaskedInput mask="11111-11" />
      </Form.Item>
    </>
  );
};

export default StepEntrega;
