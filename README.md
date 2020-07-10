# VUTTR (Frontend)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0f6cdd55-94d0-4205-b51d-18cd6f4326b1/deploy-status)](https://app.netlify.com/sites/bossabox-challenge/deploys)

Este repositório contém uma simples interface front-end para o desafio de front-end do BossaBox.
- Em conjunto com a api a interface é completamente funcional.

![Screenshot 1](bossabox.png)

Tecnologias utilizadas:
* [ReactJS](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* [Yarn](https://yarnpkg.com/)

## Como executar
- Faça o clone/download deste repositório;
- Garanta que sua [api](https://gitlab.com/bossabox/challenge-fake-api/tree/master) esteja rodando na porta 3000;
- Execute `yarn install` e `yarn start`. A interface fica localizada em `http://localhost:3001`.

## Recursos
Esta interface tem implementado as seguintes rotas da api:

* `GET /tools` : lista as ferramentas cadastradas
* `POST /tools` : cria uma nova ferramenta
* `DELETE /tools/:id` : apaga a ferramenta com ID :id
* Em `GET /tools` fazer uma busca global utilizando a query string `?q=:busca`;
* Em `GET /tools` fazer uma busca por tags individuais utilizando a query string `?tags_like=:busca`.

