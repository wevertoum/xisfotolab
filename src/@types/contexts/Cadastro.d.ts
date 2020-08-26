/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface Cadastro {
    fileList: Models.FileList[];
    setFileList: Dispatch<SetStateAction<Models.FileList[]>>;
    clienteEmail: string;
    setClienteEmail: Dispatch<SetStateAction<string>>;
    detalheEntrega: string;
    setDetalheEntrega: Dispatch<SetStateAction<string>>;
    telefoneCliente: string;
    setTelefoneCliente: Dispatch<SetStateAction<string>>;
  }
}
