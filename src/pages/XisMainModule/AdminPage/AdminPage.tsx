import React, { memo, useState } from "react";
import "./AdminPage.less";

import { Affix, Button, Layout, Menu } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  StepForwardOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  TagsOutlined,
  PieChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import ListPedidos from "components/ListPedidos";
import PerfilAdmin from "components/PerfilAdmin";
import SubMenu from "antd/lib/menu/SubMenu";
import PricesAdmin from "components/PricesAdmin";
import AnalyticsAdmin from "components/AnalyticsAdmin";

const { Sider, Content } = Layout;

const COLLAPSED_WIDTH = 80;
const UNCOLLAPSED_WIDTH = 200;
const COLLAPSE_ANIMATION = "all 0.2s linear";

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  const [currentComponent, setcurrentComponent] = useState<React.ReactNode>(
    <ListPedidos
      collectionInput="pedidos-solicitados"
      nameList="Pedidos solicitados"
    />
  );

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="container-menu-sider">
      {mobile && (
        <Affix offsetTop={20}>
          <Button
            icon={<MenuOutlined />}
            shape="circle"
            size="large"
            type="text"
            onClick={() => setCollapsed((collapsed) => !collapsed)}
          />
        </Affix>
      )}
      <Sider
        breakpoint="lg"
        onBreakpoint={(breaked) => {
          setMobile(breaked);
          setCollapsed(breaked);
        }}
        theme="light"
        onCollapse={toggle}
        collapsible
        collapsed={collapsed}
        collapsedWidth={mobile ? 0 : COLLAPSED_WIDTH}
        style={{
          height: "100%",
          position: "fixed",
          zIndex: 2,
          left: 0,
          overflow: "auto",
          overflowX: "hidden",
          transition: COLLAPSE_ANIMATION,
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["2"]}
          siderCollapsed={collapsed}
          collapsedWidth={COLLAPSED_WIDTH}
          style={{
            transition: COLLAPSE_ANIMATION,
          }}
        >
          <Menu.Item
            onClick={() => setcurrentComponent(<PerfilAdmin />)}
            key="1"
            icon={<UserOutlined />}
          >
            Perfil de usuário
          </Menu.Item>
          <SubMenu
            key="pedidos_grupo"
            title={
              <span>
                <ShoppingCartOutlined />
                <span>Pedidos</span>
              </span>
            }
          >
            <Menu.Item
              onClick={() =>
                setcurrentComponent(
                  <ListPedidos
                    collectionInput="pedidos-solicitados"
                    nameList="Pedidos solicitados"
                  />
                )
              }
              key="2"
              icon={<ClockCircleOutlined />}
            >
              Solicitados
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                setcurrentComponent(
                  <ListPedidos
                    collectionInput="pedidos-andamento"
                    nameList="Pedidos em andamento"
                  />
                )
              }
              key="3"
              icon={<StepForwardOutlined />}
            >
              Em andamento
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                setcurrentComponent(
                  <ListPedidos
                    collectionInput="pedidos-cancelados"
                    nameList="Pedidos cancelados"
                  />
                )
              }
              key="4"
              icon={<DeleteOutlined />}
            >
              Cancelados
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                setcurrentComponent(
                  <ListPedidos
                    collectionInput="pedidos-concluidos"
                    nameList="Pedidos concluídos"
                  />
                )
              }
              key="5"
              icon={<CheckCircleOutlined />}
            >
              Concluídos
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="configs_grupo"
            title={
              <span>
                <SettingOutlined />
                <span>Configurações</span>
              </span>
            }
          >
            <Menu.Item
              onClick={() => setcurrentComponent(<PricesAdmin />)}
              key="6"
              icon={<TagsOutlined />}
            >
              Preços
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            onClick={() => setcurrentComponent(<AnalyticsAdmin />)}
            key="7"
            icon={<PieChartOutlined />}
          >
            Analytics
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {mobile && !collapsed && (
          <div
            style={{
              zIndex: 1,
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 64,
              left: 0,
              background: "#0005",
            }}
            onClick={() => setCollapsed(true)}
          />
        )}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            transition: COLLAPSE_ANIMATION,
            marginTop: 64,
            marginLeft: mobile
              ? 0
              : collapsed
              ? COLLAPSED_WIDTH
              : UNCOLLAPSED_WIDTH,
            background: "var(--background-color)",
          }}
        >
          {currentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(AdminPage);
