# AudioShop API

REST API for a small audio-gear e-commerce store: users, products, cart, orders, order items and reviews, with customer and admin roles.

## What it does

- Register and log in with email and password (bcrypt hashes, JWT bearer tokens)
- Public product catalogue; admins create, update and delete products
- Per-user shopping cart (add, update quantity, remove, clear)
- Orders and order items for authenticated users; admin-only deletes
- Product reviews with a rating and text
- Request validation with express-validator
- Experimental Stripe payment-intent routes

## Stack

- Node.js, TypeScript, Express 4
- Prisma 4 with PostgreSQL
- bcrypt, jsonwebtoken, express-validator, cors, morgan, dotenv
- Stripe Node SDK
- ts-node and nodemon for running the server

## Run locally

Requires Node.js and a PostgreSQL database.

```bash
npm ci
cp .env.example .env        # then fill in the values
npx prisma migrate deploy   # create the tables
npx prisma generate         # generate the Prisma client
npm run dev                 # nodemon + ts-node, or: npm start
```

Environment variables (see `.env.example`): `DATABASE_URL`, `JWT_SECRET`, `PORT`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`.

New accounts get the `customer` role. To make an admin, set `role` to `admin` on the user's row in the `User` table.

## Endpoints

Routes are mounted at the root (there is no `/api` prefix). Everything except the public routes needs an `Authorization: Bearer <token>` header.

| Method | Path | Access |
| --- | --- | --- |
| POST | `/register`, `/login` | Public |
| GET | `/product`, `/product/:id` | Public |
| POST | `/product` | Admin |
| PUT, DELETE | `/product/:id` | Admin |
| GET, POST | `/order` | Authenticated |
| GET, PUT | `/order/:id` | Authenticated |
| DELETE | `/order/:id` | Admin |
| GET, POST | `/orderitem` | Authenticated |
| GET | `/orderitem/:id` | Authenticated |
| DELETE | `/orderitem/:id` | Admin |
| GET, POST | `/review` | Authenticated |
| GET | `/review/:id` | Authenticated |
| DELETE | `/review/:id` | Admin |
| GET, POST | `/cart` | Authenticated |
| PUT, DELETE | `/cart/:cartId` | Authenticated |

Example:

```bash
curl -X POST localhost:3000/register -H 'content-type: application/json' \
  -d '{"email":"me@example.com","password":"secret","firstName":"Ada","lastName":"L","address":"1 Main St","phoneNumber":"000"}'
curl localhost:3000/product
```

## Status

Built in 2023 as a learning project; not actively maintained.
