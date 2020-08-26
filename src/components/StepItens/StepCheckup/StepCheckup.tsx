import React, { memo, useContext } from "react";
import "./StepCheckup.less";
import { Tag } from "antd";
import CadastroContext from "contexts/CadastroContext";

const StepCheckup: React.FC = () => {
  const { fileList, clienteEmail } = useContext(CadastroContext);

  return (
    <>
      <h3>
        Confira alguns dados e confirme o pedido
      </h3>
      <div className="item-check">
        <h2 className="title-check">Quantidade de fotos do pedido</h2>
        <div>
          <Tag color="orange">Quantidade de fotos: {fileList.length}</Tag>
        </div>
      </div>
      <div className="item-check">
        <h2 className="title-check">Confira seu e-mail</h2>
        <div>
          <Tag color="orange">{clienteEmail || "seu email"}</Tag>
        </div>
      </div>
    </>
  );
};

export default memo(StepCheckup);
