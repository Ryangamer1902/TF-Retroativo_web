# API RESTful de Cadastro de Clientes

## Descrição
API desenvolvida em Node.js com Express e PostgreSQL para gerenciar o cadastro de clientes, permitindo operações de CRUD (Create, Read, Update, Delete) com validações e tratamento de erros. Utiliza Sequelize como ORM para facilitar a integração com o banco de dados.

---

## Tecnologias Utilizadas
- Node.js (LTS)
- Express.js
- PostgreSQL
- Sequelize (ORM)
- dotenv
- nodemon (dev)
- Git

---

## Pré-requisitos
- Node.js instalado
- npm ou yarn instalado
- PostgreSQL instalado e em execução

---

## Estrutura do Projeto
```
├── package.json
├── server.js
├── .env
├── src/
│   ├── app.js
│   ├── controllers/
│   │   └── clienteController.js
│   ├── database/
│   │   └── index.js
│   ├── middlewares/
│   ├── models/
│   │   └── cliente.js
│   └── routes/
│       └── clienteRoutes.js
```

---

## Instalação

1. **Clone o repositório:**
   ```powershell
git clone https://github.com/Ryangamer1902/TF-Retroativo_web.git
```

2. **Instale as dependências:**
   ```powershell
npm install
```

3. **Crie o arquivo `.env` na raiz do projeto:**
   ```env
DB_NAME=nome_do_seu_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

4. **Configure o banco de dados:**
   - Crie o banco de dados no PostgreSQL com o nome definido em `DB_NAME`.
   - Execute o DDL abaixo para criar a tabela `clientes`:
     ```sql
     CREATE TABLE clientes (
         codigo SERIAL PRIMARY KEY,
         nome VARCHAR(255) NOT NULL,
         data_nascimento DATE,
         rg VARCHAR(20),
         cpf VARCHAR(14) UNIQUE,
         telefone VARCHAR(20),
         endereco VARCHAR(255),
         numero VARCHAR(10),
         cidade VARCHAR(100),
         uf CHAR(2),
         cep VARCHAR(9)
     );
     ```

---

## Como Executar a API

1. **Inicie o servidor:**
   ```powershell
npx nodemon server.js
```
   ou
   ```powershell
node server.js
```

2. **Acesse:**
   - A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Documentação das Rotas (Endpoints)

### 1. Criar Cliente
- **POST** `/clientes`
- **Corpo da requisição:**
  ```json
  {
    "nome": "João Silva",
    "data_nascimento": "1990-01-01",
    "rg": "1234567",
    "cpf": "123.456.789-00",
    "telefone": "(11) 91234-5678",
    "endereco": "Rua Exemplo",
    "numero": "100",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "01000-000"
  }
  ```
- **Respostas:**
  - 201: Cliente criado
  - 400: Erro de validação
  - 500: Erro interno

### 2. Buscar Cliente por Código
- **GET** `/clientes/:codigo`
- **Respostas:**
  - 200: Cliente encontrado
  - 404: Não encontrado
  - 500: Erro interno

### 3. Listar Clientes (com filtros opcionais)
- **GET** `/clientes?nome=João&cidade=São Paulo&uf=SP`
- **Respostas:**
  - 200: Lista de clientes
  - 500: Erro interno

### 4. Atualizar Cliente
- **PUT** `/clientes/:codigo`
- **Corpo da requisição:** (envie apenas os campos a serem atualizados)
  ```json
  {
    "telefone": "(11) 98888-7777"
  }
  ```
- **Respostas:**
  - 200: Cliente atualizado
  - 400: Erro de validação
  - 404: Não encontrado
  - 500: Erro interno

### 5. Excluir Cliente
- **DELETE** `/clientes/:codigo`
- **Respostas:**
  - 204: Excluído com sucesso
  - 404: Não encontrado
  - 500: Erro interno

---

## Exemplos de Requisição (usando curl)

### Criar Cliente
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "123.456.789-00"
  }'
```

### Buscar Cliente
```bash
curl http://localhost:3000/clientes/1
```

### Listar Clientes
```bash
curl http://localhost:3000/clientes
```

### Atualizar Cliente
```bash
curl -X PUT http://localhost:3000/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{ "telefone": "(11) 98888-7777" }'
```

### Excluir Cliente
```bash
curl -X DELETE http://localhost:3000/clientes/1
```

---

## Como Utilizar a API
- Use ferramentas como Postman, Insomnia ou curl para testar os endpoints.
- Siga os exemplos acima para realizar as operações de CRUD.

---

## Observações
- O campo `cpf` deve ser único.
- O campo `nome` é obrigatório.
- Validações básicas são aplicadas para CPF, CEP, telefone e data de nascimento.
- O projeto está pronto para receber melhorias como autenticação, testes automatizados e logs.

---

# Atualização para forçar contribuição
# Atualização para forçar contribuição
Atualização para forçar contribuição Fri May 30 23:32:27     2025
