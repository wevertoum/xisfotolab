import React, { memo, useCallback, useMemo, useState } from "react";
import "./AnalyticsAdmin.less";
import FadeLoading from "components/FadeLoading";
import {
  Card,
  Col,
  Collapse,
  DatePicker,
  Result,
  Row,
  Space,
  Tabs,
} from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { BarChartOutlined, FileMarkdownOutlined } from "@ant-design/icons";
import { collection } from "utils/firebase";
import moment, { Moment } from "moment";
import { Pie } from "react-chartjs-2";
import Display from "components/Display";
import CustomRate from "components/AvaliacaoItens/CustomRate";
const { Panel } = Collapse;

const AnalyticsAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Models.Avaliacao[]>(
    [] as Models.Avaliacao[]
  );
  const [dateSelected, setDateSelected] = useState<[Moment, Moment]>();

  const searchData = useCallback(async (range: Moment[]) => {
    setDateSelected(range as [Moment, Moment]);
    if (range) {
      setLoading(true);
      const initDate = range[0].toDate();
      const finalDate = range[1].toDate();

      await collection("avaliacoes")
        .where("data_avaliacao", ">=", initDate)
        .where("data_avaliacao", "<=", finalDate)
        .orderBy("data_avaliacao", "desc")
        .onSnapshot((snapshot) => {
          const avaliacoesApi: Models.Avaliacao[] = snapshot.docs.map((doc) =>
            doc.data()
          ) as Models.Avaliacao[];
          console.log(avaliacoesApi);
          setAvaliacoes(avaliacoesApi);
          setLoading(false);
        });
    }
  }, []);

  const notasXis = useMemo(() => {
    let notas = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
    };
    avaliacoes.map(({ avaliacao_xis }) => {
      switch (avaliacao_xis.stars) {
        case 1:
          return (notas.a = notas.a + 1);
        case 2:
          return (notas.b = notas.b + 1);
        case 3:
          return (notas.c = notas.c + 1);
        case 4:
          return (notas.d = notas.d + 1);
        case 5:
          return (notas.e = notas.e + 1);
      }
      return notas;
    });
    return notas;
  }, [avaliacoes]);

  const notasSis = useMemo(() => {
    let notas = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
    };
    avaliacoes.map(({ avaliacao_sistema }) => {
      switch (avaliacao_sistema.stars) {
        case 1:
          return (notas.a = notas.a + 1);
        case 2:
          return (notas.b = notas.b + 1);
        case 3:
          return (notas.c = notas.c + 1);
        case 4:
          return (notas.d = notas.d + 1);
        case 5:
          return (notas.e = notas.e + 1);
      }
      return notas;
    });
    return notas;
  }, [avaliacoes]);

  const HeaderFilters: React.FC = () => (
    <Space>
      <DatePicker.RangePicker
        value={dateSelected}
        onChange={(e) => searchData(e as Moment[])}
        locale={locale}
        placeholder={["Data Inicial", "Data Final"]}
        format="DD/MM/YYYY"
        style={{ width: "100%" }}
        className="form-filter-item"
        size="large"
      />
    </Space>
  );

  return (
    <>
      <FadeLoading loading={loading} />
      <h3>Visualizar feedback</h3>

      <Card className="display-card-analytics" extra={<HeaderFilters />}>
        <Tabs tabPosition="left">
          <Tabs.TabPane
            tab={
              <span>
                <BarChartOutlined />
                Charts
              </span>
            }
            key="charts"
          >
            {avaliacoes.length > 0 ? (
              <div className="content-chart">
                <div className="graph-content">
                  <Pie
                    data={{
                      labels: [
                        "1 estrela",
                        "2 estrelas",
                        "3 estrelas",
                        "4 estrelas",
                        "5 estrelas",
                      ],
                      datasets: [
                        {
                          label: "Rainfall",
                          backgroundColor: [
                            "#ff4545",
                            "#ffa534",
                            "#ffe234",
                            "#b7dd29",
                            "#57e32c",
                          ],
                          data: [
                            notasXis.a,
                            notasXis.b,
                            notasXis.c,
                            notasXis.d,
                            notasXis.e,
                          ],
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Aprovação da empresa Xis",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
                <div className="graph-content">
                  <Pie
                    data={{
                      labels: [
                        "1 estrela",
                        "2 estrelas",
                        "3 estrelas",
                        "4 estrelas",
                        "5 estrelas",
                      ],
                      datasets: [
                        {
                          label: "Rainfall",
                          backgroundColor: [
                            "#ff4545",
                            "#ffa534",
                            "#ffe234",
                            "#b7dd29",
                            "#57e32c",
                          ],
                          data: [
                            notasSis.a,
                            notasSis.b,
                            notasSis.c,
                            notasSis.d,
                            notasSis.e,
                          ],
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Aprovação do sistema",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            ) : (
              <Result
                status="warning"
                title="Nadinha de nada"
                subTitle="Selecione outro intervalo!"
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <FileMarkdownOutlined />
                Feedbacks
              </span>
            }
            key="feedbacks"
          >
            {avaliacoes.length > 0 ? (
              <Collapse accordion className="collapse-item-pedido">
                {avaliacoes.map(
                  (
                    { avaliacao_sistema, avaliacao_xis, data_avaliacao, id },
                    i
                  ) => (
                    <Panel
                      header={`${moment(data_avaliacao!.seconds * 1000).format(
                        "DD/MM/Y hh:mm a"
                      )}`}
                      key={id!}
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          {avaliacao_xis.stars && (
                            <Row gutter={16}>
                              <Display>
                                Estrelas Xis
                                <CustomRate
                                  disabled
                                  value={avaliacao_xis.stars}
                                />
                              </Display>
                            </Row>
                          )}
                          {avaliacao_xis.feedback && (
                            <Row gutter={16}>
                              {avaliacao_xis.stars && (
                                <Display>
                                  Feedback
                                  <p>{avaliacao_xis.feedback}</p>
                                </Display>
                              )}
                            </Row>
                          )}
                        </Col>

                        <Col span={12}>
                          {avaliacao_sistema.stars && (
                            <Row gutter={16}>
                              <Display>
                                Estrelas Sistema
                                <CustomRate
                                  disabled
                                  value={avaliacao_sistema.stars}
                                />
                              </Display>
                            </Row>
                          )}
                          {avaliacao_sistema.feedback && (
                            <Row gutter={16}>
                              {avaliacao_sistema.stars && (
                                <Display>
                                  Feedback
                                  <p>{avaliacao_sistema.feedback}</p>
                                </Display>
                              )}
                            </Row>
                          )}
                        </Col>
                      </Row>
                    </Panel>
                  )
                )}
              </Collapse>
            ) : (
              <Result
                status="warning"
                title="Nadinha de nada"
                subTitle="Selecione outro intervalo!"
              />
            )}
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default memo(AnalyticsAdmin);
