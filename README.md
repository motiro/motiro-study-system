# Motirõ Study System

Class scheduling system

## Technologies

- Node
- Typescript
- Express
- Mongoose
- Prettier
- Docker Compose
- Swagger

## Architecture

```
├── src/
│   ├── applications/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── usecases/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   │
│   ├── infrastructure/
│   │   ├── authentication/
│   │   │   └── jwt
│   │   └── persistence/
│   │       └── mongo
│   │
│   ├── routes/
│   │
│   └── index.ts
```

## Run the application

Clone this repository

```bash
  git clone https://github.com/motiro/motiro-study-system
```

Access the project folder

```bash
  cd motiro-study-system
```

Run the application with docker

```bash
  docker compose up
```

```bash
  or
```

Install the dependencies

```bash
  npm install
```

Run the application

```bash
  npm run dev
```
