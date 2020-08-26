import React, { memo, useContext, useCallback } from "react";
import "./PerfilAdmin.less";
import { Card, Space, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import UserContext from "contexts/UserContext";
import { useHistory } from "react-router-dom";

const PerfilAdmin: React.FC = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const logout = useCallback(() => {
    localStorage.clear();
    history.replace("/login");
    window.location.reload();
  }, [history]);

  return (
    <Card className="display-card-perfil" title="Perfil do usuário">
      <div className="logo-content">
        <img src={user.foto_perfil} alt="logo xis foto lab" />
      </div>

      <Space direction="horizontal" align="center">
        <div>
          <span role="img" aria-label="emoji usuario">
            👩🏽‍🦲
          </span>
          <b>{user.nome_completo || "não informado"}</b>
          <br />
          <span role="img" aria-label="emoji emal">
            💌
          </span>
          <b>{user.email || "não informado"}</b>
          <br />
          <span role="img" aria-label="emoji aniversario">
            🎉
          </span>
          <b>{user.dt_nascimento || "não informado"}</b>
          <br />
          <span role="img" aria-label="emoji telefone">
            📱
          </span>
          <b>{user.telefone || "não informado"}</b>
          <br />
          <span role="img" aria-label="emoji tipo perfil">
            {user.nivel === "admin" ? "👩🏿‍💻‍" : "💁🏾‍♂️"}
          </span>
          <b>{user.nivel || "não informado"}</b>
          <br />
        </div>
      </Space>
      <div className="button-logout">
        <Button type="primary" onClick={logout} icon={<LogoutOutlined />}>
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default memo(PerfilAdmin);
