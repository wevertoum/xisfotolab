import React, { memo, useState } from "react";
import "./AdminPage.less";

import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import ListPedidos from "components/ListPedidos";
import PerfilAdmin from "components/PerfilAdmin";
import SubMenu from "antd/lib/menu/SubMenu";
import PricesAdmin from "components/PricesAdmin";
import AnalyticsAdmin from "components/AnalyticsAdmin";

const { Sider, Content } = Layout;

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [editing, setEditing] = useState(false);

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
      <Sider
        theme="light"
        onCollapse={toggle}
        collapsible
        collapsed={collapsed}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={["2"]}>
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
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {currentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(AdminPage);
