# Environment Configuration — HD-BRAIN

## Overview

HD-BRAIN uses environment variables for all configuration. No secrets are hardcoded.

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `APP_NAME` | Application identifier | `HD-BRAIN` |
| `APP_PORT` | HTTP server port | `3005` |
| `API_BASE_URL` | Base URL for this API | `http://localhost:3005` |
| `HD_CORE_MODE` | HD-CORE resolution mode | `local` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/hdbrain` |
| `DECISION_LOG_DB_URL` | Immutable decision log database | `postgresql://user:password@localhost:5432/hdbrain_decisions` |
| `AUDIT_DB_URL` | Audit database URL | `postgresql://user:password@localhost:5432/hdaudit` |
| `EVENT_BUS_URL` | Event bus connection string | `amqp://localhost:5672` |
| `JWT_SECRET` | JWT signing secret | (never hardcode) |
| `N8N_WEBHOOK_BASE_URL` | n8n webhook base URL | `http://localhost:5678` |
| `LOG_LEVEL` | Logging level | `info` |

## Security Rules

1. Never commit a `.env` file with real values.
2. `DECISION_LOG_DB_URL` must point to a separate, append-only database.
3. BRAIN_AGENT must never have write access to CRM, RH, OPERATIONS, or ADMIN databases.
