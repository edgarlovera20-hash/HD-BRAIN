# API Contract — HD-BRAIN

## Overview

HD-BRAIN exposes a read-only intelligence API. It does not expose mutation endpoints for external platforms. All data ingestion happens via event consumption.

## Base URL

```
https://api.hd-brain.internal/v1
```

## Authentication

- All endpoints require a valid JWT with platform-level scopes.
- Only HD-ADMIN may access the full recommendation and decision log APIs.

## Resources

### KPI Dashboard

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /kpis | `brain:kpi:read` | Get current KPI snapshot across all platforms |
| GET | /kpis/:platform | `brain:kpi:read` | Get KPIs for a specific platform |

### Risk Signals

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /risks | `brain:risk:read` | List active risk signals |
| GET | /risks/:id | `brain:risk:read` | Get a specific risk signal detail |

### Recommendations

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /recommendations | `brain:recommendation:read` | List pending recommendations (human review) |
| PATCH | /recommendations/:id/approve | `brain:recommendation:approve` | Approve a recommendation (human only) |
| PATCH | /recommendations/:id/reject | `brain:recommendation:approve` | Reject a recommendation (human only) |

### Decision Log

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /decisions | `brain:decision:read` | Query the immutable decision log |

## Prohibited

- HD-BRAIN does not expose any mutation endpoints for CRM, RH, Finance, or Operations data.
- No direct database access from other platforms.
- Recommendations must never auto-apply without human approval.

## Events Emitted

See `docs/EVENTS.md`.

## Audit Rules

- Every API call that returns sensitive risk or recommendation data must produce an `AuditEntry`.
- Approvals and rejections of recommendations must produce `AuditEntry` with `severity: critical`.

## Error Contract

| Code | Meaning |
|---|---|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 429 | Rate limit exceeded |
| 500 | Internal error |
