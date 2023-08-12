# curso cypress - basico

Um projeto visando o aprendizado do framework cypress para automação de testes, tanto em frente de ambiente web, como backend (api).

## Pre-requerimentos

É necessário para os testes já ter instalado o npm e o node.js para poder rodar o projeto. 

> Eu usei as versões `v18.17.0` and `9.6.7` do Node.js e npm, respectivamente. Como são as últimas versões do teste, aconselho utiliza-los até que novas versões sejam liberadas.

## Installation

Para poder utilizar o cypress é preciso rodar o comando "npm install cypress@9.5.1 --save-dev", onde a versão `9.5.1` foi aquela utilizado no projeto de teste.

## Tests

> **Observação:** Para os testes, fiz uso da extensão `cypress helper` como facilitador para algumas configurações e acesso rápido a comandos, como `cy.only`.

Execute o comando `npm test` (ou `npm t` para uma versão curta) para rodar o teste em modo headless.

Ou, execute o comando `npm run cy:open` para abrir o Cypress em modo interativo.

___

Este projeto foi criado por [Fabiano], através do curso de cypress-basico-v2 ministrado pelo professor [walmyr].
