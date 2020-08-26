import React, { useContext, memo, Suspense } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { Result, Button, Space } from "antd";
import UserContext from "contexts/UserContext";
import FadeLoading from "components/FadeLoading";

interface Props {
  component: React.FC<any>;
  lazy?: boolean;
  guard?: () => boolean;
}
const PrivateRoute: React.FC<Props & RouteProps> = ({
  component: Component,
  lazy = false,
  guard = () => true,
  ...routeProps
}) => {
  const { user } = useContext(UserContext);

  const history = useHistory();

  // const logout = useCallback(() => {
  //   localStorage.clear();
  //   history.replace("/login");
  //   window.location.reload();
  // }, [history]);

  return (
    <>
      {user.nivel === "admin" ? (
        <Route
          {...routeProps}
          render={(props) => {
            if (lazy) {
              return (
                <Suspense fallback={<FadeLoading loading />}>
                  <Component {...props} />
                </Suspense>
              );
            } else return <Component {...props} />;
          }}
        />
      ) : (
        <Space
          direction="horizontal"
          align="center"
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Result
            status="403"
            title="403"
            subTitle="Você não tem autorização pra acessar essa página :/"
            extra={
              <Button type="primary" onClick={() => history.goBack()}>
                Voltar
              </Button>
            }
          />
        </Space>
      )}
    </>
  );
};

export default memo(PrivateRoute);
