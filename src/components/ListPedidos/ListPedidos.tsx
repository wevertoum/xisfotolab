import React, { memo, useCallback, useState, useEffect } from "react";
import "./ListPedidos.less";
import { Collapse, Row, Col, Result, Select } from "antd";

import useMountEffect from "hooks/lifecycle/useMountEffect";
import { collection, document as doc } from "utils/firebase";
import FadeLoading from "components/FadeLoading";
import Display from "components/Display";
import TagListFotos from "components/TagListFotos";
import moveFirestoreDoc from "utils/moveFirestoreDoc";
const { Panel } = Collapse;

const collectionsPedidos = [
  {
    collectionRef: "pedidos-solicitados",
    name: "Solicitados",
  },
  {
    collectionRef: "pedidos-andamento",
    name: "Andamento",
  },
  {
    collectionRef: "pedidos-cancelados",
    name: "Cancelados",
  },
  {
    collectionRef: "pedidos-concluidos",
    name: "Concluidos",
  },
];

interface Props {
  collectionInput: string;
  nameList: string;
}

const ListPedidos: React.FC<Props> = ({ collectionInput, nameList }) => {
  const [loading, setLoading] = useState(false);
  const [listPedidos, setListPedidos] = useState<Models.FormModel[]>(
    [] as Models.FormModel[]
  );

  //TODO implementar um estado que altera esse limite somando + 10 no limite do scroll

  const buscarLista = useCallback(async () => {
    setLoading(true);
    await collection(collectionInput)
      .orderBy("data_pedido", "desc")
      .limit(30)
      .onSnapshot((snapshot) => {
        const lista: Models.FormModel[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as Models.FormModel[];
        setListPedidos(lista);
        setLoading(false);
      });
  }, [collectionInput]);

  const moverPedido = useCallback(
    async (destiny: string, value: Models.FormModel) => {
      try {
        setLoading(true);
        const docRef = doc(value.id, collectionInput).path;
        await moveFirestoreDoc(docRef, destiny, value);
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [collectionInput]
  );

  // const moverPedido = useCallback(async () => {}, []);

  useMountEffect(async () => buscarLista());

  useEffect(() => {
    buscarLista();
  }, [buscarLista, collectionInput]);

  return (
    <div className="list-pedidos-container">
      <FadeLoading loading={loading} />
      <h3>{nameList}</h3>
      {listPedidos.length > 0 ? (
        listPedidos.map((pedido, i) => (
          <Collapse key={pedido.id} className="collapse-item-pedido">
            <Panel header={pedido.nome_completo} key={i}>
              <Row gutter={16}>
                <Col span={12}>
                  <Display>
                    E-mail
                    {pedido.email || "Não informado"}
                  </Display>
                </Col>
                <Col span={12}>
                  <div
                    id={`select-uf-crm-${pedido.id}`}
                    style={{ position: "absolute" }}
                  >
                    <Select
                      getPopupContainer={() =>
                        document.getElementById(`select-uf-crm-${pedido.id}`)!!
                      }
                      style={{ width: 130 }}
                      onChange={(destiny) => {
                        moverPedido(destiny.toString(), pedido);
                      }}
                      placeholder="Mover pedido"
                    >
                      {collectionsPedidos
                        ?.filter(
                          ({ collectionRef }) =>
                            collectionRef !== collectionInput
                        )
                        .map(({ collectionRef, name }) => (
                          <Select.Option
                            key={collectionRef}
                            value={collectionRef}
                          >
                            {name}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
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
                    {pedido.detalhes_entrega || "Sem observações"}
                  </Display>
                </Col>
              </Row>
              {pedido.endereco && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Display>
                      Endereço
                      {`${
                        pedido.endereco.cidade || "(cidade não informada)"
                      } - ${pedido.endereco.estado}, ${
                        pedido.endereco.bairro || "(bairro nao informado)"
                      }, ${pedido.endereco.rua || "(rua não informada)"}, ${
                        pedido.endereco.complemento ||
                        "(complemento não informado)"
                      }, Nº ${pedido.endereco.numero || "numero"}, CEP ${
                        pedido.endereco.cep || "(cep não informado)"
                      }`}
                    </Display>
                  </Col>
                </Row>
              )}
              <Row gutter={16}>
                <Col span={24}>
                  <Display>
                    Detalhes pedido
                    {pedido.descricao}
                  </Display>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Display>
                    Fotos
                    <TagListFotos fotos={pedido.fotografias} />
                  </Display>
                </Col>
              </Row>
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
