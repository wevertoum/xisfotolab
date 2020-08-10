# omnisaude-web

## Como usar

#### Instalação
1. Clone o projeto  
> git clone https://gitlab.com/americashealthteam/omnisaude/frontend/omnisaude-operadora.git
2. Entre na pasta do projeto recém clonado `cd omnisaude-operadora`
3. Crie 2 arquivos **.env** na pasta raíz seguindo o seguinte template:
> REACT_APP_AGORA_KEY=  
REACT_APP_FIREBASE_KEY=  
REACT_APP_CHATBOT_USER_ID=  
REACT_APP_EMPRESA=  
- **Atenção:** Os nomes dos arquivos devem ser `.env` para a OmniSaude e `.profarma.env` para a Profarma, seguindo exatamente o mesmo template e variando apenas o valor de _REACT_APP_EMPRESA_.
4. Vá até o [Firebase Console](https://console.firebase.google.com) e copie o objeto de configuração do projeto.  
4.1. Em seguida, crie um arquivo **firebaseConfig.js** na pasta `/src/utils/`, o arquivo deve ser declarado com a seguinte sintaxe:
> export default {  
// os valores do objeto copiado vão aqui  
}
5. Ainda na pasta `omnisaude-operadora`, execute no terminal: `yarn`.
6. Se desejar rodar o projeto, basta executar no terminal: `yarn start` ou `yarn start:profarma`.  
6.1. Para gerar um build de produção, execute: `yarn build` para gerar um build da Omni **OU** `yarn build:profarma` para gerar um build da Profarma.
> **ATENÇÃO**: a propriedade _REACT_APP_EMPRESA_ do arquivo `.env` altera o comportamento da aplicação durante sua execução. Para saber mais, [clique aqui](https://gitlab.com/americashealthteam/omnisaude/frontend/omnisaude-operadora/-/issues/28).  
Os valores possíveis são **omni** ou **profarma**.