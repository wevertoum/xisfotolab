import React, { memo } from "react";
import "./AvaliaForm.less";
import { Form, Input } from "antd";
import CustomRate from "../CustomRate";

interface Props {
  title: string;
  rootName: string;
}

const AvaliaForm: React.FC<Props> = ({ title, rootName }) => {
  return (
    <>
      <h3>{title}</h3>
      <Form.Item name={[rootName, "stars"]} label="E aí, o que achou!">
        <CustomRate />
      </Form.Item>
      <Form.Item
        rules={[
          {
            max: 256,
            message: "Você atingiu o maximo de caracteres :/",
          },
        ]}
        name={[rootName, "feedback"]}
        label="Conta pra gente!"
      >
        <Input.TextArea
          maxLength={256}
          rows={5}
          placeholder="Nos ajude a melhorar"
        />
      </Form.Item>
    </>
  );
};

export default memo(AvaliaForm);
