import React, { memo, useContext } from "react";
import "./StepPessoais.less";
import { Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import defaultFormRules from "utils/defaultFormRules";
import CadastroContext from "contexts/CadastroContext";

const StepPessoais: React.FC = () => {
  const { setClienteEmail } = useContext(CadastroContext);
  return (
    <>
      <h3 className="title-general-step">Vamos começar com seus dados :)</h3>

      <Form.Item
        label="Nome Completo"
        name="nome_completo"
        rules={defaultFormRules}
      >
        <Input placeholder="insira seu nome completo" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={defaultFormRules}>
        <Input
          onChange={(e) => setClienteEmail(e.target.value)}
          placeholder="insira seu e-mail"
        />
      </Form.Item>
      <Form.Item
        label="Celular/WhatsApp"
        name="telefone"
        rules={defaultFormRules}
      >
        <MaskedInput
          placeholder="insira seu número de telefone"
          mask="(11) 11111-1111"
        />
      </Form.Item>
    </>
  );
};

export default memo(StepPessoais);
