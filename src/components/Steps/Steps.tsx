import React, {
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useReducer,
} from "react";
import "./Steps.less";
import { Button, Progress, message, Modal } from "antd";
import { format } from "path";
import { FormInstance } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { merge } from "lodash";

interface Props {
  children: ReactNode[];
  form: FormInstance;
}

const Steps: React.FC<Props> = ({ children, form }) => {
  const [index, setIndex] = useState(1);
  const [errors, setErros] = useState<string[]>([]);

  const [values, setValues] = useState<any>();
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

  const changeStep = (value: number) => {
    const errors = form
      .getFieldsError()
      .reduce((acc, { errors }) => [...acc, ...errors], [] as string[]);
    if (errors.length > 0) {
      Modal.error({
        content: (
          <>
            {errors.map((error) => (
              <p>{error}</p>
            ))}
          </>
        ),
        title: "Atenção",
      });
    } else {
      setIndex(index + value);
    }
    setErros(errors);
  };

  const toggleNext = () => {
    form.submit();
    changeStep(1);
  };
  const togglePrev = () => {
    form.submit();
    changeStep(-1);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <section className="steps-container">
      <div className="steps-content">
        <Progress
          percent={percent}
          status={errors.length > 0 ? "exception" : "active"}
        />
        {index && (
          <Form
            onFinish={(values) => {
              setValues((old: any) => merge(old, values));
            }}
            form={form}
          >
            {currentStep}
          </Form>
        )}

        <Button onClick={togglePrev} disabled={isFirst}>
          voltar
        </Button>
        <Button onClick={toggleNext} disabled={isLast}>
          avançar
        </Button>
      </div>
    </section>
  );
};

export default Steps;
