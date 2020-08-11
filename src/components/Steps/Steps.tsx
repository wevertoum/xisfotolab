import React, { useState } from "react";
import "./Steps.less";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { MaskedInput } from "antd-mask-input";
import { InboxOutlined } from "@ant-design/icons";

const Steps = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const FormStepDadosPessoais = () => {
    return (
      <>
        <h3>Vamos começar com seus dados :)</h3>
        <Form.Item label="Nome Completo" name="nome_completo">
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

  const FormStepDadosPedido = () => {
    return (
      <>
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

  const FormStepDadosEntrega = () => {
    return (
      <>
        <h3>Agora vamos aos detalhes da entrega</h3>
        <Form.Item
          name="detalhes_entrega"
          label="Detalhes da entrega"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Selecione um tipo de entrega!">
            <Select.Option value="correios">Correios</Select.Option>
            <Select.Option value="retirada">Retirada</Select.Option>
            <Select.Option value="entrega_gyn">
              Entrega em Goiânia
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Rua" name={["endereco", "rua"]}>
          <Input placeholder="insira seu nome completo" />
        </Form.Item>
        <Form.Item label="CEP" name={["endereco", "cep"]}>
          <MaskedInput mask="11111-11" />
        </Form.Item>
        <Form.Item label="Quantidade de fotos" name="quantidade_fotos">
          <InputNumber />
        </Form.Item>
      </>
    );
  };

  return (
    <section className="steps-container">
      <div className="steps-content">
        <Form layout="vertical" form={form} onFinish={console.log}>
          <FormStepDadosEntrega />
        </Form>
      </div>
    </section>
  );
};

export default Steps;
