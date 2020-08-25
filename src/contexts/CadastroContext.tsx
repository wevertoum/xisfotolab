import React, { createContext, useState } from "react";

const CadastroContext = createContext({} as Contexts.Cadastro);

interface Props {}
export const CadastroProvider: React.FC<Props> = ({ children }) => {
  const [fileList, setFileList] = useState<Models.FileLocal[]>(
    [] as Models.FileLocal[]
  );
  const [clienteEmail, setClienteEmail] = useState("");

  return (
    <CadastroContext.Provider
      value={{ fileList, setFileList, clienteEmail, setClienteEmail }}
    >
      {children}
    </CadastroContext.Provider>
  );
};

export default CadastroContext;