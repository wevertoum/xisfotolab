import React from "react";
import "./StepPessoais.less";
import { Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import defaultFormRules from "utils/defaultFormRules";

const StepPessoais: React.FC = () => {
  return (
    <>
      <h3>Vamos começar com seus dados :)</h3>

      <Form.Item
        label="Nome Completo"
        name="nome_completo"
        rules={defaultFormRules}
      >
        <Input placeholder="insira seu nome completo" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={defaultFormRules}>
        <Input placeholder="insira seu e-mail" />
      </Form.Item>
      <Form.Item
        label="Celular/WhatsApp"
        name="telefone"
        rules={defaultFormRules}
      >
        <MaskedInput
          placeholder="insira seu nome telefone"
          mask="(11) 11111-1111"
        />
      </Form.Item>
    </>
  );
};

export default StepPessoais;
