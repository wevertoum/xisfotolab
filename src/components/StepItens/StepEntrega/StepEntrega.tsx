import React, { memo, useState, useMemo, useContext } from "react";
import "./StepEntrega.less";
import { Form, Input, Select, Row, Col } from "antd";
import { MaskedInput } from "antd-mask-input";
import defaultFormRules from "utils/defaultFormRules";
import estados from "utils/estados";
import Atendimento from "icons/Atendimento";
import CadastroContext from "contexts/CadastroContext";

const StepEntrega: React.FC = () => {
  const [detalhe, setDetalhe] = useState("entrega");
  const entrega = useMemo(() => detalhe === "entrega", [detalhe]);
  const { setDetalheEntrega } = useContext(CadastroContext);
  return (
    <>
      <h3>Agora vamos aos detalhes da entrega</h3>
      <Form.Item
        name="detalhes_entrega"
        label="Detalhes da entrega"
        rules={defaultFormRules}
      >
        <Select
          placeholder="Selecione um tipo de entrega!"
          onChange={(e) => {
            setDetalhe(e as string);
            setDetalheEntrega(e as string);
          }}
        >
          <Select.Option value="entrega">
            Desejo Receber a Encomenda
          </Select.Option>
          <Select.Option value="retirada">
            Vou retirar a encomenda
          </Select.Option>
        </Select>
      </Form.Item>

      {entrega ? (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cidade"
                name={["endereco", "cidade"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Input placeholder="Qual a sua cidade?" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Estado"
                name={["endereco", "estado"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Select placeholder="Selecione">
                  {estados.map(({ nome, sigla }) => (
                    <Select.Option key={nome} value={sigla}>
                      {nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Bairro"
                name={["endereco", "bairro"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Input placeholder="Qual o seu bairro?" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rua"
                name={["endereco", "rua"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Input placeholder="Digite o nome da rua" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="CEP"
                name={["endereco", "cep"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <MaskedInput mask="11111-111" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Número"
                name={["endereco", "numero"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Input placeholder="Digite o número da casa/predio" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Complemento"
                name={["endereco", "complemento"]}
                rules={entrega ? defaultFormRules : undefined}
              >
                <Input.TextArea placeholder="Por ex: Apto 206, casa 403" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        <div className="image-retirada" style={{}}>
          <Atendimento />
          <h3>Ok! Vamos combinar a entrega</h3>
        </div>
      )}
    </>
  );
};

export default memo(StepEntrega);
