/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface Avaliacao {
    id?: string;
    avaliacao_sistema: TiposAvaliacao;
    avaliacao_xis: TiposAvaliacao;
    data_avaliacao?: Models.TimesTamp;
  }

  interface TiposAvaliacao {
    stars: number;
    feedback: string;
  }
}
