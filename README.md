# Lyxa Backend Microservices

This project contains three **NestJS microservices** communicating via **RabbitMQ** with **MongoDB** as the database:

* **lyxa-api-gateway** – API gateway exposing endpoints
* **lyxa-auth-service** – Authentication service (user management, JWT validation)
* **lyxa-product-service** – Product service (manages product data and user snapshots)

All services can run **independently** or **together** via **Docker Compose**.

---

## Directory Structure

```text
lyxa-be
│
├─ lyxa-api-gateway/
│   ├─ Dockerfile
│   └─ .env
│
├─ lyxa-auth-service/
│   ├─ Dockerfile
│   └─ .env
│
├─ lyxa-product-service/
│   ├─ Dockerfile
│   └─ .env
│
└─ docker-compose.yml
```

> ⚠️ Ensure each service has a `.env` file, as required by the Docker Compose setup.

---

## Environment Variables

Each service requires a `.env` file with the following minimum variables.

### lyxa-api-gateway/.env

```env
AUTH_GRPC_URL=lyxa-auth-service:50051
PRODUCT_GRPC_URL=lyxa-product-service:50053
```

### lyxa-auth-service/.env

```env
GRPC_PORT=50051
MONGODB_URI=mongodb://mongodb:27017/auth-db
RABBITMQ_URL=amqp://lyxa_user:lyxa_password@rabbitmq:5672
```

### lyxa-product-service/.env

```env
GRPC_PORT=50053
MONGODB_URI=mongodb://mongodb:27017/product-db
RABBITMQ_URL=amqp://lyxa_user:lyxa_password@rabbitmq:5672
```

> You can adjust these values for local or production environments as needed.

---

## Running with Docker Compose

The Docker Compose script is available [here](https://github.com/raihan-sust20/lyxa-api-gateway/blob/master/docker-compose.yaml).

Start all services, including **API Gateway**, **Auth Service**, **Product Service**, **MongoDB**, and **RabbitMQ**:

```bash
docker compose up -d --build
```

Access the services:

* **API Gateway:** `http://localhost:5001`
* **RabbitMQ Management UI:** `http://localhost:15672`

  * Username: `lyxa_user`
  * Password: `lyxa_password`
* **MongoDB:** `mongodb://localhost:29017`

Stop all services:

```bash
docker compose down
```

---

## Manual Development Setup

Install dependencies:

```bash
npm install
```

Start services individually:

```bash
# Development mode
npm run start

# Watch mode for hot reload
npm run start:dev

# Production build
npm run start:prod
```

> Each service can be run independently for testing and debugging.

---

## Inter-Service Communication Flow

### 1. User Registration Event (Publish/Subscribe via RabbitMQ)

* `lyxa-auth-service` publishes a **user created** event containing a snapshot of user data.
* `lyxa-product-service` consumes this event and stores the user snapshot in its own MongoDB database.

### 2. Authentication Token Validation (RPC via RabbitMQ)

* `lyxa-product-service` sends an **RPC request** to `lyxa-auth-service` for token validation.
* `lyxa-auth-service` validates the token and returns the result.

### 3. ASCII Diagram

```text
        ┌─────────────────────┐
        │   lyxa-api-gateway  │
        │       :5001         │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
lyxa-auth-service       lyxa-product-service
      :50051                  :50053
        │                     │
        └───────┬─────────────┘
                │
             RabbitMQ
           (lyxa-rabbitmq:5672)
                │
             MongoDB
            (lyxa-mongodb:27017)
```

---

## Notes

* Services communicate via **service names** inside Docker:

  * `lyxa-auth-service:50051`
  * `lyxa-product-service:50053`
  * `rabbitmq:5672`
  * `mongodb:27017`

* `.env` files are **mandatory** for each service.

* Make sure RabbitMQ and MongoDB are running before starting the microservices.

---
