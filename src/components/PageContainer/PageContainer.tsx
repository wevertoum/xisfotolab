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
        <div className="page-wrapper">
          {children}
          <small>
            Feito com{" "}
            <span role="img" aria-label="sheep">
              🧡
            </span>{" "}
            por{" "}
            <a
              href="https://weverton.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Weverton
            </a>
          </small>
        </div>
      </div>
    </>
  );
};

export default memo(PageContainer);
