import React, { ReactNode, useState, useMemo, memo } from "react";
import "./Steps.less";
import { Button, Progress } from "antd";
import { FormInstance } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { merge } from "lodash";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

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
    <div className="steps-container">
      <div className="logo-content">
        <img src="xis_logo.jpg" alt="logo xis foto lab" />
      </div>
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
      </div>
      <div className="footer-buttons">
        <Button
          shape="circle"
          onClick={togglePrev}
          disabled={isFirst}
          type="primary"
          icon={<ArrowLeftOutlined />}
          size="large"
        />
        <Button
          shape="circle"
          onClick={form.submit}
          type="primary"
          icon={isLast ? <CheckCircleOutlined /> : <ArrowRightOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default memo(Steps);
