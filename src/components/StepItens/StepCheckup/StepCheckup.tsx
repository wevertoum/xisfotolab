import React, { memo, useContext, useCallback, useState, useMemo } from "react";
import "./StepCheckup.less";
import { Card, Row, Col, Divider } from "antd";
import CadastroContext from "contexts/CadastroContext";
import Display from "components/Display";
import CheckList from "icons/CheckList";
import FadeLoading from "components/FadeLoading";
import { collection } from "utils/firebase";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import formatter from "utils/formatter";

const StepCheckup: React.FC = () => {
  const {
    fileList,
    clienteEmail,
    detalheEntrega,
    telefoneCliente,
  } = useContext(CadastroContext);
  const [loading, setLoading] = useState(true);
  const [precos, setPrecos] = useState({} as Models.Precos);

  const qtdComIma = useMemo(
    () => fileList.filter(({ com_ima }) => com_ima).length,
    [fileList]
  );

  const qtdSemIma = useMemo(() => fileList.length - qtdComIma, [
    fileList,
    qtdComIma,
  ]);

  const buscarPrecos = useCallback(async () => {
    setLoading(true);
    await collection("configs")
      .doc("precos")
      .onSnapshot((snapshot) => {
        const precos = snapshot.data() as Models.Precos;
        setPrecos(precos);
        setLoading(false);
      });
  }, []);

  const precosUnitarios: Dict<number> = useMemo(() => {
    if (Object.keys(precos).length > 0) {
      return fileList.reduce((valores, { uid, com_ima }) => {
        if (com_ima) {
          if (qtdComIma > 20) {
            //@ts-ignore
            valores[uid] = precos.polaroid_magnet.valor_promo!;
          } else {
            //@ts-ignore
            valores[uid] = precos.polaroid_magnet.valor;
          }
        } else {
          if (qtdSemIma > 20) {
            //@ts-ignore
            valores[uid] = precos.polaroid_simples.valor_promo!;
          } else {
            //@ts-ignore
            valores[uid] = precos.polaroid_simples.valor;
          }
        }
        return valores;
      }, {});
    } else return {};
  }, [fileList, precos, qtdComIma, qtdSemIma]);

  const precoTotal = useMemo(() => {
    return fileList.reduce((preco, { uid }) => {
      return (
        //@ts-ignore
        preco + (precosUnitarios[uid] || 0)
      );
    }, 0);
  }, [fileList, precosUnitarios]);

  useMountEffect(buscarPrecos);

  return (
    <>
      <FadeLoading loading={loading} />
      <h3>Confira alguns dados e confirme o pedido</h3>
      <div className="image-check">
        <CheckList size={100} />
      </div>

      <Card className="display-card-check">
        <Divider orientation="left">
          <small>Seus dados de contato </small>
        </Divider>

        <Row gutter={16}>
          <Col span={24}>
            <Display>
              Telefone
              {[telefoneCliente || "seu telefone"]}
            </Display>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Display>
              E-mail
              {[clienteEmail || "seu email"]}
            </Display>
          </Col>
        </Row>

        <Divider orientation="left">
          <small>Infos do pedido </small>
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Display>
              Quantidade
              {[
                `com imã: ${qtdComIma}`,
                `sem imã: ${qtdSemIma}`,
                `total: ${qtdComIma + qtdSemIma}`,
              ]}
            </Display>
          </Col>

          <Col span={12}>
            <Display>
              Preço total
              {[formatter([(precoTotal / 100).toFixed(2), "real"])]}
            </Display>
          </Col>
        </Row>

        <Divider orientation="left">
          <small>Dados de entrega </small>
        </Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Display>
              Tipo de entrega
              {[detalheEntrega || "tipo de entrega"]}
            </Display>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default memo(StepCheckup);
