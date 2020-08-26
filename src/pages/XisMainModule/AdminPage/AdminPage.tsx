import React, { memo, useState } from "react";
import "./AdminPage.less";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  StepForwardOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ListPedidos from "components/ListPedidos";
import PerfilAdmin from "components/PerfilAdmin";

const { Sider, Content } = Layout;

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [currentComponent, setcurrentComponent] = useState<React.ReactNode>(
    <ListPedidos
      colection="pedidos-solicitados"
      nameList="Pedidos Selecionados"
    />
  );

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="container-menu-sider">
      <Sider onCollapse={toggle} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item
            onClick={() => setcurrentComponent(<PerfilAdmin />)}
            key="1"
            icon={<UserOutlined />}
          >
            Perfil de usuário
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              setcurrentComponent(
                <ListPedidos
                  colection="pedidos-solicitados"
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
                  colection="pedidos-andamento"
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
                  colection="pedidos-cancelados"
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
                  colection="pedidos-concluidos"
                  nameList="Pedidos concluídos"
                />
              )
            }
            key="5"
            icon={<CheckCircleOutlined />}
          >
            Concluídos
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
