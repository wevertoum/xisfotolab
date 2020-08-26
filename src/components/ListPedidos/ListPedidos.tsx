import React, { memo, useCallback, useState, useEffect } from "react";
import "./ListPedidos.less";
import { Collapse, Row, Col, Result } from "antd";

import useMountEffect from "hooks/lifecycle/useMountEffect";
import { collection } from "utils/firebase";
import FadeLoading from "components/FadeLoading";
import Display from "components/Display";
const { Panel } = Collapse;

interface Props {
  colection: string;
  nameList: string;
}

const ListPedidos: React.FC<Props> = ({ colection, nameList }) => {
  const [loading, setLoading] = useState(false);
  const [listPedidos, setListPedidos] = useState<Models.FormModel[]>(
    [] as Models.FormModel[]
  );

  //TODO implementar um estado que altera esse limite somando + 10 no limite do scroll

  const buscarLista = useCallback(async () => {
    setLoading(true);
    await collection(colection)
      .orderBy("data_pedido", "desc")
      .limit(30)
      .onSnapshot((snapshot) => {
        const lista: Models.FormModel[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as Models.FormModel[];
        setListPedidos(lista);
        setLoading(false);
      });
  }, [colection]);

  useMountEffect(async () => buscarLista());

  useEffect(() => {
    buscarLista();
  }, [buscarLista, colection]);

  return (
    <div className="list-pedidos-container">
      <FadeLoading loading={loading} />
      <h3>{nameList}</h3>
      {listPedidos.length > 0 ? (
        listPedidos.map((pedido, i) => (
          <Collapse className="collapse-item-pedido">
            <Panel header={pedido.nome_completo} key={i}>
              <Row gutter={16}>
                <Col span={24}>
                  <Display>
                    E-mail
                    {pedido.email || "Não informado"}
                  </Display>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Display>
                    Telefone
                    {pedido.telefone || "Não informado"}
                  </Display>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Display>
                    Quantidade de fotos
                    {pedido.quantidade_fotos || "Não informado"}
                  </Display>
                </Col>
                <Col span={12}>
                  <Display>
                    Detalhe Entrega
                    {pedido.detalhes_entrega || "Não informado"}
                  </Display>
                </Col>
              </Row>
              {pedido.endereco && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Display>
                      Detalhe Entrega
                      {`${
                        pedido.endereco.cidade || "(cidade não informada)"
                      } - ${pedido.endereco.estado}, ${
                        pedido.endereco.bairro || "(bairro nao informado)"
                      }, ${pedido.endereco.rua || "(rua não informada)"}, ${
                        pedido.endereco.bairro || "(bairro não informado)"
                      } - ${pedido.endereco.cep || "(cep não informado)"}, ${
                        pedido.endereco.complemento ||
                        "(complemento não informado)"
                      }`}
                    </Display>
                  </Col>
                </Row>
              )}
            </Panel>
          </Collapse>
        ))
      ) : (
        <Result
          status="warning"
          title="Nadinha de nada"
          subTitle="Tente novamente mais tarde!"
        />
      )}
    </div>
  );
};

export default memo(ListPedidos);
