/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface FormModel {
    id?: string;
    nome_completo: string;
    email: string;
    telefone: string;
    descricao?: string;
    data_pedido?: TimesTamp;
    detalhes_entrega: "retirada" | "entrega";
    endereco?: Endereco;
    quantidade_fotos: number;
    fotografias: FileLocal[];
    valor_pedido: number;
  }

  interface Endereco {
    cidade: string;
    estado: Models.Estados;
    bairro: string;
    rua: string;
    cep: string;
    numero: string;
    complemento: string;
  }
  interface FileLocal {
    uid?: string;
    size?: number;
    name: string;
    url: string;
    legenda?: string;
    cor_borda?: string;
    com_ima?: boolean;
  }

  interface TimesTamp {
    seconds: number;
    nanoseconds: number;
  }
}
