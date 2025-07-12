# TaskNow - Gerenciador de Tarefas Full-Stack

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Sobre o Projeto

TaskNow é uma aplicação web completa (Full-Stack) desenvolvida para permitir que usuários gerenciem suas tarefas diárias de forma simples e eficiente. O projeto conta com um sistema de autenticação seguro para garantir a privacidade das tarefas de cada usuário e uma interface reativa construída com as tecnologias mais modernas do ecossistema JavaScript.

Este projeto foi uma jornada de aprendizado completa, cobrindo desde a concepção do backend e modelagem do banco de dados até a construção de uma interface de usuário interativa e estilizada, passando por um intenso processo de depuração e resolução de problemas.

## 📸 Demonstração

![Tela de Login do TaskNow](https://i.imgur.com/iC5pE3m.png)
*(Sugestão: Grave um GIF ou vídeo curto mostrando o fluxo de registro, login e criação de tarefas e substitua o link desta imagem!)*

## ✨ Funcionalidades

- **Autenticação de Usuários:** Sistema completo de Registro e Login.
- **Segurança:** Senhas criptografadas com `Bcrypt` e sessões de usuário protegidas com JSON Web Tokens (`JWT`).
- **Gerenciamento de Tarefas (CRUD):**
    - **C**reate: Adicionar novas tarefas.
    - **R**ead: Visualizar a lista de tarefas pendentes e concluídas.
    - **U**pdate: Marcar tarefas como concluídas ou pendentes.
    - **D**elete: Excluir tarefas.
- **Interface Reativa:** Experiência de usuário fluida, sem a necessidade de recarregar a página.
- **Design Responsivo:** Layout funcional em diferentes tamanhos de tela graças ao Bootstrap.

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

#### **Frontend**
- **React** (com **Vite**)
- **TypeScript**
- **React Router DOM** para gerenciamento de rotas.
- **Axios** para chamadas à API.
- **Bootstrap** para estilização rápida e responsiva.

#### **Backend**
- **Node.js**
- **Express.js** como framework para a API.
- **Sequelize** como ORM para interação com o banco de dados.
- **PostgreSQL** como sistema de gerenciamento de banco de dados.

#### **Autenticação e Segurança**
- **JSON Web Token (JWT)** para gerenciamento de sessões.
- **Bcrypt.js** para criptografia de senhas (hashing).
- **Variáveis de Ambiente (`dotenv`)** para proteger dados sensíveis.

## ⚙️ Documentação da API

A API segue os princípios RESTful. O endereço base é `/api`.

### Autenticação (`/auth`)

- `POST /auth/register`
  - **Descrição:** Registra um novo usuário.
  - **Protegida:** Não.
  - **Corpo (Body):** `{ "username": "seu_usuario", "password": "sua_senha" }`
  - **Resposta de Sucesso (201 Created):** `{ "message": "Usuário criado com sucesso!", "userId": 1 }`

- `POST /auth/login`
  - **Descrição:** Autentica um usuário existente.
  - **Protegida:** Não.
  - **Corpo (Body):** `{ "username": "seu_usuario", "password": "sua_senha" }`
  - **Resposta de Sucesso (200 OK):** `{ "token": "seu_token_jwt" }`

### Tarefas (`/tasks`)

*Todas as rotas de tarefas são protegidas e requerem um Token JWT no cabeçalho `Authorization: Bearer <token>`.*

- `GET /tasks`
  - **Descrição:** Retorna a lista de todas as tarefas do usuário autenticado.
  - **Resposta de Sucesso (200 OK):** `[{ "id": 1, "title": "...", "completed": false, ... }]`

- `POST /tasks`
  - **Descrição:** Cria uma nova tarefa para o usuário autenticado.
  - **Corpo (Body):** `{ "title": "Título da nova tarefa" }`
  - **Resposta de Sucesso (201 Created):** `{ "id": 2, "title": "...", "completed": false, ... }`

- `PUT /tasks/:id`
  - **Descrição:** Atualiza uma tarefa existente (ex: marcar como concluída).
  - **Corpo (Body):** `{ "title": "Título atualizado", "completed": true }`
  - **Resposta de Sucesso (200 OK):** `{ "id": 2, "title": "...", "completed": true, ... }`

- `DELETE /tasks/:id`
  - **Descrição:** Deleta uma tarefa específica.
  - **Resposta de Sucesso (204 No Content):** (Corpo da resposta vazio)


## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://seu-link-do-github.com/TaskNow.git](https://seu-link-do-github.com/TaskNow.git)
    cd TaskNow
    ```

2.  **Configure o Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Crie um arquivo `.env` na pasta `backend` e preencha com suas credenciais do PostgreSQL e um segredo para o JWT. Exemplo:
      ```
      DB_HOST=localhost
      DB_USER=seu_usuario_postgres
      DB_PASSWORD=sua_senha_postgres
      DB_NAME=tasknow_db  # Lembre-se de criar este banco de dados no seu PostgreSQL
      JWT_SECRET=seu_segredo_super_secreto_para_jwt
      ```
    - Inicie o servidor do backend:
      ```bash
      npm run dev
      ```
      *O servidor estará rodando em `http://localhost:5000`.*

3.  **Configure o Frontend:**
    - Abra um **novo terminal**.
    ```bash
    cd frontend
    npm install
    ```
    - Inicie a aplicação React:
      ```bash
      npm run dev
      ```
      *A aplicação estará disponível em `http://localhost:8000` (ou a porta que você configurou).*


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.