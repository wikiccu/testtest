# Invoice and Email Sender Services

This repository contains two microservices: `Invoice Service` for managing invoices and generating daily sales reports, and `Email Sender` for consuming those reports from RabbitMQ and sending them via email.

## Prerequisites

Before running the services, ensure you have the following installed:

- Docker and Docker Compose
- Node.js and npm (optional for local development)

---

## Invoice Service

The Invoice Service is a NestJS application for managing invoices and publishing daily sales reports.

### Features

- Create, retrieve, and list invoices.
- Generate daily sales reports via a cron job.
- Publish sales reports to RabbitMQ.

### Setup and Run

  docker-compose up -d

Access the service:

  REST API will be available at http://localhost:3000.
  Stop the service:

```bash
  docker-compose down
```
### API Endpoints
  POST /invoices: Create a new invoice.
  GET /invoices/:id: Retrieve an invoice by ID.
  GET /invoices: List all invoices.

### Testing
```bash
  # Unit tests
  npm run test

  # Integration tests
  npm run test:e2e
```

### Logs and Monitoring
    Logs are available inside the Docker container.
    RabbitMQ management UI: http://localhost:15672.

### Environment Variables

- RABBITMQ_URI: RabbitMQ connection string.
- EMAIL_SERVICE: Email service provider (e.g., mock, SendGrid).

---

# Email Sender Service
The Email Sender Service is a NestJS application that consumes sales report messages from RabbitMQ and sends them via email.

### Features

- Consume sales reports from RabbitMQ.
- Send reports using a mock or real email service.

### Setup and Run

Start the service using Docker Compose:

```bash
    docker-compose up -d
```
---

### Environment Variables

- RABBITMQ_URI: RabbitMQ connection string.
- EMAIL_SERVICE: Email service provider (e.g., mock, SendGrid).