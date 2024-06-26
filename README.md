# FROTEND USER

![INDT](./src/assets/icons/logo_new.jpg)

Este repositório contém as informações necessárias para facilitar deploy e instalação, do front-end do sistema User no seu ambiente de desenvolvimento ou de produção.

# Tabela de conteúdos

<!--ts-->

- [Tecnologias](#1-Tecnlogias)
- [Estrutura de pastas](#2-estrutura-de-pastas)
- [Pré-requisitos](#3-pré-requisitos)
- [Clonando o repositório de front-end do projeto FROTEND USER](#4-clonando-o-repositório-de-front-end-do-projeto-frontend-user)
- [Configurações](#5-configurações)
- [Configuração de deploy front-end do projeto FROTEND USER usando o Docker](#6-configuração-de-deploy-front-end-do-projeto-frontend-user-usando-o-docker)

<!--te-->

## 1. Tecnologias

- Typescript
- React
- Vite
- D3Chart
- Docker
- Docker compose
- Material UI

## 2. Estrutura de pastas

```bash
📦src
 ┣ 📂assets
 ┃ ┗ 📂icons
 ┃ ┃ ┣ 📜401.png
 ┃ ┃ ┣ 📜bg.jpg
 ┃ ┃ ┗ 📜logo_new.jpg
 ┣ 📂components
 ┃ ┣ 📂AppContainer
 ┃ ┃ ┣ 📂Content
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂MenuList
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂DrawerResposive
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂ModalContainer
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ModalDelete
 ┃ ┃ ┗ 📜ModalDelete.tsx
 ┃ ┣ 📂ModalVersion
 ┃ ┃ ┣ 📜style.tsx
 ┃ ┃ ┗ 📜version.tsx
 ┃ ┣ 📂ProgressBar
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TableGrid
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂ToastContainer
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂ToolbarContainer
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┣ 📂layouts
 ┃ ┗ 📂DefaultLayout
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂models
 ┃ ┣ 📜graph.model.ts
 ┃ ┣ 📜login.ts
 ┃ ┗ 📜user.ts
 ┣ 📂pages
 ┃ ┣ 📂Graphs
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜signInSide.tsx
 ┃ ┣ 📂NotFound
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Users
 ┃ ┃ ┣ 📂table
 ┃ ┃ ┃ ┣ 📂TableGrid
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.tsx
 ┃ ┃ ┃ ┗ 📜columns.tsx
 ┃ ┃ ┣ 📜createUser.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜styles.tsx
 ┣ 📂routes
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜pages.routes.tsx
 ┃ ┗ 📜signIn.routes.tsx
 ┣ 📂services
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂graph
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂paciente
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜api.ts
 ┣ 📂shared
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜auth.tsx
 ┃ ┃ ┣ 📜useModal.tsx
 ┃ ┃ ┣ 📜useRefresh.tsx
 ┃ ┃ ┗ 📜useToast.tsx
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜validate-email.ts
 ┃ ┗ 📂themes
 ┃ ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 3. Pré-requisitos

- Sistema operacional Linux Ubuntu 22 lts ou Windows 11

- Instalar VS CODE para visualizar os projetos

- Instalar Node versão 21.7.0

- Instalar Yarn versão 1.22.18 LTS (ou versão superior LTS)

- Instalar a versão Git 2.25.1 LTS (ou superior LTS)

- Instalar Docker versão 20.10.11 LTS (ou versão superior LTS)

- Instalar Docker-compose versão 1.29.2 LTS (ou versão superior LTS)

## 4. Clonando o repositório de front-end do projeto FROTEND USER

- Clonar o repositório

  - git clone <endereço-do-repositório>

  - Abrir a pasta clonada
    <br /><br />

## 5. Configurações

Configure o arquivo .env de acordo com as especificações desejadas

VITE_PORT_PROJECT_BACKEND = Endereço do Backend

## 6. Configuração de deploy front-end do projeto FROTEND USER usando o Docker

Abra o terminal de comando e navegue até pasta do projeto e execute:

```sh
$ cd <diretorio_do_seu_projeto>
$ docker compose up -d --build
```

Após o container ser criado, utilize o comando abaixo para ver os logs do contêiner:

```sh
$ docker logs <id_do_container> -f
```

Executar o comando abaixo para iniciar o projeto FROTEND USER.

```sh
yarn start
```
