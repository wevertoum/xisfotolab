/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface Cadastro {
    fileList: Models.FileLocal[];
    setFileList: React.Dispatch<React.SetStateAction<Models.FileLocal[]>>;
    clienteEmail: string;
    setClienteEmail: React.Dispatch<React.SetStateAction<string>>;
    detalheEntrega: string;
    setDetalheEntrega: React.Dispatch<React.SetStateAction<string>>;
    telefoneCliente: string;
    setTelefoneCliente: React.Dispatch<React.SetStateAction<string>>;
    descricao: string;
    setDescricao: React.Dispatch<React.SetStateAction<string>>;
  }
}
