/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface FormModel {
    nome_completo: string;
    email: string;
    telefone: string;
    descricao: string;
    quantidade_fotos: string;
    detalhes_entrega: string;
    endereco: Endereco;
    pagamento: "transferencia" | "picpay" | "dinheiro";
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
}
