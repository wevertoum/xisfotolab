import React from "react";
import "./PageContainer.less";

import { Helmet } from "react-helmet";

const PageContainer: React.FC<any> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="page-container">
        <section className="page-wrapper">{children}</section>
      </div>
    </>
  );
};

export default PageContainer;
