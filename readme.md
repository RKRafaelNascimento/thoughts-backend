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
git clone https://github.com/RKRafaelNascimento/boilerplate_typescript.git
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

## Step 4: Run Database Migrations

Run the migration script to apply the latest database schema changes:

```bash
npm run migrate:dev
```

## Step 5: Seed the Database

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

### Option 2: Run with Docker Compose

If you choose to run the application using Docker, follow these steps to set up the database:

```bash
cp .env.example .env
```

```bash
docker-compose up
```

Application will run on the port specified in your .env.development file (default: 3000).

---

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
