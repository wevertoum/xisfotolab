import React, { useState } from "react";
import "./Steps.less";
import Button from "antd/lib/button";

const Steps = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="steps-container">
      <div>
        <h3>Bem vindo a XIS :)</h3>
        <Button type="primary" onClick={console.log}>
          Iniciar pedido
        </Button>
      </div>
    </section>
  );
};

export default Steps;
