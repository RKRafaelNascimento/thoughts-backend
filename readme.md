# Techs

![Node.js](https://img.shields.io/badge/Node.js-Runtime-Green?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Express](https://img.shields.io/badge/Express-Framework-000?style=for-the-badge&logo=express&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-Validation-orange?style=for-the-badge)
![Swagger UI](https://img.shields.io/badge/Swagger-Documentation-green?style=for-the-badge&logo=swagger)

In this project, we used the following technologies:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)- Text editor with following plugins installed: [DotENV](https://github.com/mikestead/vscode-dotenv), [ESLint](https://github.com/Microsoft/vscode-eslint), [GitLens](https://github.com/eamodio/vscode-gitlens) e [vscode-icons](https://github.com/vscode-icons/vscode-icons).
- [Jest](https://jestjs.io/) - Javascript Test Framework.
- [ESLint](https://github.com/eslint/eslint) - ESLint to padronize the project code.
- [Prettier](https://prettier.io/) - To format code automatically.
- [Prisma](https://www.prisma.io/) - Prisma is a next-generation ORM and database toolkit that provides a type-safe database client, automated migrations, and advanced query capabilities for Node.js and TypeScript applications.

## Getting Started

### Prerequisites

To set up and run this project, ensure you have the following installed:

- **Node.js**: `>= 18.20.4`
- **npm**: Comes with Node.js
- **Docker & Docker Compose** (optional): To run the application in a containerized environment

---

### Setup Instructions

## Step 1: Clone the Repository

```bash
git clone https://github.com/RKRafaelNascimento/thoughts-backend.git
```

## Step 2: Configure Environment Variables

1 - Copy the .env.example file to create a new .env.development file

```bash
cp .env.example .env.development
```

2 - Fill in the necessary values in the .env.development file. Example

#### Fill in the necessary values in the .env.development file. Example

```bash
PORT=3000
NODE_ENV=development
```

## Step 3: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### Step 4: Run Docker Compose

Bringing up the PostgreSQL database for the application to run, follow these steps to set up the database:

```bash
docker-compose up
```

Application will run on the port specified in your .env.development file (default: 3000).

---

## Step 5: Run Database Migrations

Run the migration script to apply the latest database schema changes:

```bash
npm run migrate:dev
```

## Step 6: Seed the Database

Run the seed script to populate the database with initial data:

```bash
npm run seed:dev
```

## Step 6: Run the Application

### Option 1: Run Locally

To run the application locally, use the development start command:

```bash
npm run start:dev
```

### Additional Commands

Here are some additional commands you can use:

Build: Build the application for production

```bash
npm run build
```

Lint: Run the linter to check for code issues

```bash
npm run lint
```

Lint (Fix): Automatically fix linting issues

```bash
npm run lint:fix
```

Run Tests: Run all tests

```bash
npm run test
```

---

### Postman Collection

The Postman collection is available in the following path

```
\_postman
```

---

### Swagger API Documentation

The API documentation is available at the following endpoint after starting the application:

```bash
http://localhost:<PORT>/api-docs
```

Replace <PORT> with the value defined in your .env.development file (default: 3000).

---

## Follow

**Endpoint:** POST /follow/{followedId}  
**Descrição:** Permite que um usuário autenticado siga outro usuário. O request deve incluir o 'user_id' no cabeçalho.
**Objetivo:** Adicionar um usuário à lista de seguidos do usuário autenticado.

**Endpoint:** DELETE /follow/{followedId}  
**Descrição:** Permite que um usuário autenticado pare de seguir outro usuário. O request deve incluir o 'user_id' no cabeçalho.
**Objetivo:** Remover um usuário da lista de seguidos do usuário autenticado.

---

## Post

**Endpoint:** POST /post  
**Descrição:** Permite que um usuário autenticado crie uma nova postagem. O request deve incluir o 'user_id' no cabeçalho.  
**Objetivo:** Criar uma nova postagem no sistema.

**Endpoint:** GET /post/feed  
**Descrição:** Recupera o feed de postagens do usuário autenticado. O request deve incluir o 'user_id' no cabeçalho. Caso o parâmetro `filter=following` seja passado, apenas postagens de usuários seguidos serão retornadas.  
**Objetivo:** Obter as postagens recentes no feed do usuário.

**Endpoint:** GET /post/{userId}  
**Descrição:** Recupera todas as postagens de um usuário específico.  
**Objetivo:** Listar todas as postagens feitas por um usuário específico.

---

## Repost

**Endpoint:** POST /repost/{originalPostId}  
**Descrição:** Permite que um usuário autenticado repost um post de outro usuário. O request deve incluir o 'user_id' no cabeçalho.  
**Objetivo:** Criar um repost de uma postagem existente.

---

## User

**Endpoint:** GET /user  
**Descrição:** Recupera os detalhes do perfil do usuário autenticado. O request deve incluir o 'user_id' no cabeçalho.  
**Objetivo:** Obter informações do perfil do usuário logado.

---

### Crítica

Crítica e Escalabilidade

1️⃣ Partes do Sistema que Falhariam Primeiro

Se o projeto crescesse rapidamente, algumas partes do sistema se tornariam gargalos e poderiam falhar. As principais áreas críticas seriam:

🔹 Banco de Dados (PostgreSQL)

- À medida que o número de usuários e postagens aumenta, as consultas ao banco se tornam mais pesadas.
- O feed de postagens (GET /posts/feed) pode sofrer lentidão, pois exige buscas e ordenação em tempo real.

🔹 Criação de Postagens e Repostagens

- Inserções simultâneas de postagens podem gerar concorrência alta, impactando a performance.

- O uso de AUTO_INCREMENT pode gerar conflitos se houver múltiplas instâncias do banco de dados.

🔹 API Externa de Análise de Sentimento

- Se muitos usuários postarem ao mesmo tempo, a API pode atingir seu limite de requisições ou aumentar a latência.

- O sistema pode ficar dependente da API, tornando-se um ponto único de falha.

2️⃣ Estratégias para Escalar o Sistema / Melhorias

📌 1. Melhorar o Banco de Dados

✅ Indexação

- Criar índices específicos para consultas de feed e busca de postagens para reduzir a complexidade de busca de O(n) ~~ O(n²) para O(log N).

- 📌 Trade-off: Em tabelas que recebem muitas atualizações e inserções, a indexação pode gerar latência adicional, pois precisa ser atualizada constantemente.

```
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
```

✅ Replicação e Read-Replicas

- Distribuir a carga entre bancos de leitura para melhorar a performance.
- Leituras pesadas (GET /posts/feed) podem ser direcionadas para réplicas, reduzindo a carga do banco principal.

✅ Uso de Cache (Redis)

- Consultas frequentes, como o feed, podem ser armazenadas no Redis, reduzindo chamadas ao banco de dados.
- Buscar no Redis (O(1)) é muito mais rápido do que consultar o banco (O(log N)).

📌 2. Melhorar a Criação de Postagens e Repostagens

🔹 Fila Assíncrona para Criação de Postagens

- Publicar posts e reposts em uma fila (RabbitMQ, Kafka, SQS) para processamento em background.
- Reduz a latência da API, pois o usuário não precisa esperar a análise de sentimento antes de receber uma resposta.
- Evita falhas causadas pela API de análise de sentimento.

- Garante resiliência e tolerância a falhas, permitindo o reprocessamento em caso de erros.

🔹 Uso de UUID no Lugar de AUTO_INCREMENT

- Permite escalabilidade horizontal sem risco de conflitos em múltiplos bancos.
- Evita locks e concorrência excessiva na inserção de novos registros.

3️⃣ Tecnologias e Infraestrutura para Suporte à Escalabilidade

- 🔹 Fila de Mensagens (RabbitMQ, Kafka, SQS) → Processamento assíncrono de postagens e análise de sentimento.
- 🔹 Redis → Cache para otimizar a busca do feed e reduzir consultas ao banco.
- 🔹 PostgreSQL (Read Replicas) → Distribuir a carga de leitura e escrita.
- 🔹 Load Balancer ( AWS ALB) → Distribuir requisições entre múltiplos servidores de API.
- 🔹 Auto Scaling → Escalar automaticamente as instâncias da aplicação conforme a demanda, garantindo alta disponibilidade e eficiência de custos.
- 🔹 AWS ECS ou EKS → Gerenciar containers de forma escalável e eficiente.
