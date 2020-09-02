import React, { createContext, useState } from "react";

const CadastroContext = createContext({} as Contexts.Cadastro);

interface Props {}
export const CadastroProvider: React.FC<Props> = ({ children }) => {
  const [fileList, setFileList] = useState<Models.FileLocal[]>(
    [] as Models.FileLocal[]
  );
  const [clienteEmail, setClienteEmail] = useState("");
  const [detalheEntrega, setDetalheEntrega] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <CadastroContext.Provider
      value={{
        fileList,
        setFileList,
        clienteEmail,
        setClienteEmail,
        detalheEntrega,
        setDetalheEntrega,
        telefoneCliente,
        setTelefoneCliente,
        descricao,
        setDescricao,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};

export default CadastroContext;
