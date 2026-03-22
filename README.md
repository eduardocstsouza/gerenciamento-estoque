# 📦 Gerenciamento de Estoque — API

REST API para gerenciamento de estoque com autenticação JWT, controle de produtos, fornecedores, transações e documentação Swagger.

---

## 🚀 Tecnologias

- **Node.js** + **Express 5**
- **MySQL2** — banco de dados relacional
- **JWT** — autenticação stateless
- **Bcrypt** — hash de senhas
- **Swagger UI** — documentação interativa da API
- **Dotenv** — gerenciamento de variáveis de ambiente
- **Nodemon** — hot reload em desenvolvimento

---

## 📁 Estrutura do Projeto

```
backend/
└── src/
    ├── controllers/
    │   ├── authController.js
    │   ├── fornecedoresController.js
    │   ├── produtosController.js
    │   ├── transacoesController.js
    │   └── usuariosController.js
    ├── database/
    │   └── connection.js
    ├── middlewares/
    │   └── authMiddleware.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── fornecedoresRoutes.js
    │   ├── produtosRoutes.js
    │   ├── transacoesRoutes.js
    │   └── usuariosRoutes.js
    ├── server.js
    └── swagger.yaml
```

---

## ⚙️ Como executar

### Pré-requisitos

- Node.js 18+
- MySQL em execução

### Instalação

```bash
# Clone o repositório
git clone https://github.com/eduardocstsouza/gerenciamento-estoque.git
cd gerenciamento-estoque/backend

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=estoque
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### Execução

```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

---

## 📋 Módulos da API

| Módulo | Descrição |
|---|---|
| **Auth** | Login e geração de token JWT |
| **Usuários** | Cadastro e gerenciamento de usuários |
| **Produtos** | CRUD de produtos do estoque |
| **Fornecedores** | CRUD de fornecedores |
| **Transações** | Registro de entradas e saídas de estoque |

---

## 📖 Documentação

Com o servidor em execução, acesse a documentação interativa via Swagger:

```
http://localhost:3000/api-docs
```

---

## 🔐 Autenticação

As rotas protegidas exigem um token JWT no header da requisição:

```
Authorization: Bearer <token>
```

O token é obtido através do endpoint de login (`POST /auth/login`).

---

## 👤 Autor

Desenvolvido por **Carlos Eduardo**
