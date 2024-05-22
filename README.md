![CLIMAGRO](https://github.com/Biahellens/climagro/blob/main/client/src/assets/icon_climagro.svg)

# CLIMAGRO

Projeto referente ao projeto onde o objetivo é contruir uma Torre de Controle na qual possa visualizar, em tempo real, a volumetria de chuva no maior número de localidades possíveis.

- [CLIMAGRO](#CLIMAGRO)
  - [Tecnologias](#tecnologias)
  - [Inicializando](#inicializando)
    - [Client](#client)
    - [Server](#server)

## Tecnologias

Para o desenvolvimento deste projeto, foi utilizado as seguintes tecnologias:

- [Node](https://nodejs.org/en/);
- [React](https://pt-br.reactjs.org/);
- [TypeScript](https://www.typescriptlang.org/);
- [Redux](https://redux.js.org/);
- [React-Router-dom](https://reactrouter.com/en/main);
- [Styled-components](https://styled-components.com/);
- [Material-UI](https://mui.com/material-ui/getting-started/);
- [Typeorm](https://typeorm.io/);
- [Express](https://expressjs.com/pt-br/);
- [jsonwebtoken](https://jwt.io/);
- [PostgreSQL](https://www.postgresql.org/);
- [Docker](https://www.docker.com/).


## Inicializando

### Banco de dados:

O desenvolvimento do nosso banco de dados em Postgres utilizamos da imagem do Postgres a partir do docker, que ficará disponivel na porta 5432. Para iniciar nosso banco de dados o primeiro passo é acessar a nossa pasta api e database:

```bash
$ cd server/database
```

Em seguida precisamos iniciar o container do PostgreSQL:

```bash
$ docker-compose up -d
```

agora precisamos criar nossas migrations no banco de dados:

```bash
$ cd ..
$ npm run migration:run
```

### Server:

A nossa Server foi construida utilizando o Node.js utilizando Express e TypeScript, e o TypeORM. Utilizei também do bycript para a encriptação de senhas. Antes de iniciar, precisa-se instalar as dependências, para isso utilizamos o npm como nosso gerenciador de dependencias e excutamos o seguinte comando no terminal:

```bash
$ cd server
$ npm install
```

agora, podemos estar inicializando com através do comando:

```bash
$ npm run dev
```

### Iniciando o Front-end:

O nosso front-end foi inciado utilizando vite com o uso de React + Typescript e fazendo uso da biblioteca do Material UI para componentização e criação do design do projeto. O design do projeto foi criado a partir de cores e imgs/icons que remetem o agro e o campo, tudo isso a partir de um protótipo criado no figma.

Para iniciar o nosso front-end o primeiro passo é acessar a nossa pasta client: 

```bash
$ cd client
```

Em seguida já podemos inicializar o projeto:

```bash
$ npm run dev
```

### Executando a aplicação

Agora com a aplicação configurada é possível acessar a mesma através da seguinte URL para ver se esta tudo certo:

Front-end
- http://localhost:5173/

Back-end
- http://localhost:3000/

Banco de dados
- http://localhost:5432/

