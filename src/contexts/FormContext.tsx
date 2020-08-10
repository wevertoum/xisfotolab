import React, { createContext, useState } from "react";

const FormContext = createContext({} as Contexts.FormContext);

export const UserProvider: React.FC = ({ children }) => {
  const [form, setForm] = useState<Models.FormModel>({} as Models.FormModel);

  const submitForm = () => {
    console.log(form);
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const UserConsumer = FormContext.Consumer;

export default FormContext;
