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

Before you begin, you will need to have Docker Compose installed on your machine.

Clone this repository

```bash
  git clone https://github.com/motiro/motiro-study-system
```

Access the project folder

```bash
  cd motiro-study-system
```

Run the application

```bash
  docker compose up
```
