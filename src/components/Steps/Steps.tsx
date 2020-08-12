import React, { ReactNode, useState, useMemo } from "react";
import "./Steps.less";
import { Button, Progress } from "antd";
import { FormInstance } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { merge } from "lodash";

interface Props {
  children: ReactNode[];
  form: FormInstance;
  onComplete: (values: any) => void;
}

const Steps: React.FC<Props> = ({ children, form, onComplete }) => {
  const [index, setIndex] = useState(1);
  const [valuesForm, setValuesForm] = useState<any>();
  const currentStep = useMemo(() => children[index - 1], [children, index]);
  const percent = useMemo(() => Math.floor((index / children.length) * 100), [
    children.length,
    index,
  ]);
  const isFirst = useMemo(() => index === 1, [index]);
  const isLast = useMemo(() => index === children.length, [
    children.length,
    index,
  ]);

  const togglePrev = () => {
    setIndex(index - 1);
  };

  const onFinish = (values: any) => {
    setValuesForm((old: any) => merge(old, values));
    if (!isLast) {
      setIndex(index + 1);
    } else {
      onComplete(valuesForm);
    }
  };

  return (
    <section className="steps-container">
      <div className="steps-content">
        <Progress percent={percent} showInfo={false} />
        {index && (
          <Form
            initialValues={valuesForm}
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            form={form}
          >
            {currentStep}
          </Form>
        )}

        <Button onClick={togglePrev} disabled={isFirst}>
          voltar
        </Button>
        <Button onClick={form.submit}>{isLast ? "submeter" : "avançar"}</Button>
      </div>
    </section>
  );
};

export default Steps;
