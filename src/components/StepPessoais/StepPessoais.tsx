import React from "react";
import "./StepPessoais.less";
import { Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FormInstance } from "antd/lib/form";

interface Props {
  form: FormInstance;
}

const StepPessoais: React.FC<Props> = ({ form }) => {
  return (
    <>
      <h3>Vamos começar com seus dados :)</h3>

      <Form.Item label="Nome Completo" name="nome_completo" required>
        <Input placeholder="insira seu nome completo" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="insira seu nome completo" />
      </Form.Item>
      <Form.Item label="Celular/WhatsApp" name="telefone">
        <MaskedInput
          placeholder="insira seu nome telefone"
          mask="(11) 11111-1111"
        />
      </Form.Item>
    </>
  );
};

export default StepPessoais;
