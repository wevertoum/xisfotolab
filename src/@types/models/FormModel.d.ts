/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface FormModel {
    nome_completo: string;
    descricao: string;
    detalhes_entrega: string;
    endereco: Endereco;
    pagamento: "transferencia" | "picpay" | "dinheiro"
  }

  interface Endereco {
    rua: string;
    bairro: string;
    cep: string;
    numero: string;
  }
}
