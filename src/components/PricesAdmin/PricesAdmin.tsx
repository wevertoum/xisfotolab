import React, { memo, useState, useCallback } from "react";
import "./PricesAdmin.less";
import FadeLoading from "components/FadeLoading";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import { collection } from "utils/firebase";
import { Collapse, Row, Col } from "antd";
import Display from "components/Display";
import formatter from "utils/formatter";
const { Panel } = Collapse;

const PricesAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [precos, setPrecos] = useState({} as Models.Precos);

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

  useMountEffect(async () => buscarPrecos());

  return (
    <div className="prices-admin-container">
      <FadeLoading loading={loading} />
      <h3>Administrar preços</h3>
      {Object.keys(precos).length > 0 && (
        <Collapse accordion className="collapse-item-pedido">
          {Object.entries(precos).map(([nome, { valor, valor_promo }]) => (
            <Panel header={nome} key={nome}>
              <Row gutter={16}>
                <Col span={12}>
                  <Display color="orange">
                    Valor:
                    {[formatter([(valor / 100).toFixed(2), "real"])]}
                  </Display>
                </Col>
                <Col span={12}>
                  <Display color="orange">
                    Valor promocional:
                    {valor_promo
                      ? [formatter([(valor_promo / 100).toFixed(2), "real"])]
                      : ["não informado"]}
                  </Display>
                </Col>
              </Row>
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default memo(PricesAdmin);
