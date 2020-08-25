import React, { memo } from "react";
import "./LoginPage.less";

import PageContainer from "components/PageContainer";

const LoginPage: React.FC = () => {
  return (
    <PageContainer title="login">
      <p>another page</p>
    </PageContainer>
  );
};

export default memo(LoginPage);
