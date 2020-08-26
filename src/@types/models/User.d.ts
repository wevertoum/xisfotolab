/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface User {
    id?: string;
    foto_perfil: string;
    genero: string;
    email: string;
    telefone: string;
    dt_nascimento: string;
    nome_completo: string;
    nivel: "admin" | "auxiliar";
  }
}
