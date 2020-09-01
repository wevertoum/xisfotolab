import React, { memo, useContext } from "react";
import "./StepPedido.less";
import { Input, Col, Switch, Row, Tag } from "antd";
import CadastroContext from "contexts/CadastroContext";

const StepPedido: React.FC = () => {
  const { fileList, setFileList, setDescricao, descricao } = useContext(
    CadastroContext
  );

  return (
    <>
      <h3>Detalhes do pedido</h3>

      <Input.TextArea
        style={{ marginBottom: 16 }}
        onChange={(e) => setDescricao(e.target.value)}
        rows={3}
        defaultValue={descricao || ""}
        placeholder="alguma observação?"
      />

      {fileList.map((file, index) => (
        <div className="itens-detalhe-foto">
          <div className="imagem-pedido">
            <img alt="imagem selecionada do pedido" src={file.url} />
          </div>
          <div className="detalhes-pedido">
            <Row gutter={16}>
              <Col span={10}>
                <Tag color="orange">Legenda:</Tag>
              </Col>
              <Col span={14}>
                <Input
                  defaultValue={fileList[index].legenda || undefined}
                  placeholder="Digite uma legenda"
                  onChange={({ target }) => {
                    setFileList((old) => {
                      const fileList = [...old];
                      fileList[index].legenda = target.value;
                      return fileList;
                    });
                  }}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Tag color="orange">Cor da borda:</Tag>
              </Col>
              <Col span={14}>
                <Input
                  type="color"
                  placeholder="cor da borda"
                  defaultValue={fileList[index].cor_borda || "#ffffff"}
                  onChange={({ target }) => {
                    setFileList((old) => {
                      const fileList = [...old];
                      fileList[index].cor_borda = target.value;
                      return fileList;
                    });
                  }}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Tag color="orange">Tipo de foto:</Tag>
              </Col>
              <Col span={14}>
                <Switch
                  defaultChecked={fileList[index].com_ima || undefined}
                  checkedChildren={"com imã"}
                  unCheckedChildren={"sem imã"}
                  onChange={(value) => {
                    setFileList((old) => {
                      const fileList = [...old];
                      fileList[index].com_ima = value;
                      return fileList;
                    });
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(StepPedido);
