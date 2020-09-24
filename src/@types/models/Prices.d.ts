/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface Precos {
    polaroid_simples: TiposValor;
    polaroid_magnet: TiposValor;
    frete: TiposValor;
  }

  interface TiposValor {
    valor: number;
    valor_promo?: number;
  }
}
