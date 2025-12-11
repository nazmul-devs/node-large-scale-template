# Large Scale Node Enterprise (Express + TS + Prisma + Redis + RabbitMQ)

This template includes:
- Express + TypeScript
- Prisma + PostgreSQL
- Redis cache with abstraction (CacheClient)
- RabbitMQ message broker
- Internal event bus
- Nodemailer email service with templates
- Swagger API docs
- Zod validation
- Modular architecture: domain / infra / application / presentation

## Quick Start

```bash
npm install
cp .env.example .env
# edit .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

- API: http://localhost:5000/api/users
- Swagger Docs: http://localhost:5000/docs
