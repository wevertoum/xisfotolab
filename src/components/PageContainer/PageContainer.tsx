import React, { memo } from "react";
import "./PageContainer.less";

import { Helmet } from "react-helmet";

const PageContainer: React.FC<any> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="page-container">
        <div className="page-wrapper">{children}</div>
      </div>
    </>
  );
};

export default memo(PageContainer);
