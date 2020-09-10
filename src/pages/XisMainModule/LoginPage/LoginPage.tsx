import React, { memo, useCallback, useState, useContext } from "react";
import "./LoginPage.less";

import PageContainer from "components/PageContainer";
import { Button, Form, Input, Result, Modal } from "antd";
import { auth, collection } from "utils/firebase";
import FadeLoading from "components/FadeLoading";
import UserContext from "contexts/UserContext";
import { useHistory } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const navigate = useCallback(() => history.replace(`/admin`), [history]);

  const buscarUsuario = useCallback(
    async (id: string) => {
      setLoading(true);
      await collection("usuarios")
        .doc(id)
        .get()
        .then((snapshot) => {
          const user: Models.User = snapshot.data() as Models.User;
          setUser(user);
          navigate();
        })
        .catch(() => {
          Modal.error({
            centered: true,
            content: (
              <>
                <Result
                  status="500"
                  title="Erro ao carregar dados!"
                  subTitle="Tente novamente mais tarde!"
                />
              </>
            ),
          });
        })
        .finally(() => setLoading(false));
    },
    [navigate, setUser]
  );

  const loginHandler = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      try {
        const data = await auth.signInWithEmailAndPassword(email, password);
        buscarUsuario(data.user?.uid as string);
      } catch (err) {
        Modal.error({
          centered: true,
          content: (
            <>
              <Result
                status="500"
                title="Erro no login!"
                subTitle="Verifique seus dados!"
              />
            </>
          ),
        });
      } finally {
        setLoading(false);
      }
    },
    [buscarUsuario]
  );

  return (
    <PageContainer title="login">
      <FadeLoading loading={loading} />
      <div className="background">
        <article className="login-form-wrapper">
          <div className="logo-content">
            <img src="xis_logo.jpg" alt="logo xis foto lab" />
          </div>
          <Form
            form={form}
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={loginHandler}
          >
            <section className="login-form-header">Bem vindo :)</section>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Digite seu login" }]}
            >
              <Input
                size="large"
                placeholder="Login"
                style={{ padding: "6px 12px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Digite sua senha" }]}
            >
              <Input.Password size="large" placeholder="Senha" />
            </Form.Item>
            <Form.Item>
              <Button
                className="login-action"
                type="primary"
                size="large"
                htmlType="submit"
                disabled={loading}
                icon={<LoginOutlined />}
              >
                Fazer login
              </Button>
            </Form.Item>
          </Form>
        </article>
      </div>
    </PageContainer>
  );
};

export default memo(LoginPage);
