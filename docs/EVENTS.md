# Events — HD-BRAIN

## Overview

HD-BRAIN is primarily a consumer of domain events from all other platforms. It produces recommendations, risk alerts, and decision log entries. All shared event names must originate from HD-CORE.

## Produced Events

| Event | Producer | Consumers | Payload Summary | Sensitivity |
|---|---|---|---|---|
| `brain.risk.alert_generated` | HD-BRAIN | HD-CRM, HD-ADMIN, HD-OPERATIONS | riskType, affectedPlatform, severity, correlationId | confidential |
| `brain.recommendation.created` | HD-BRAIN | HD-ADMIN (human review queue) | recommendationId, type, affectedPlatform, confidence, correlationId | internal |
| `brain.kpi.dashboard_updated` | HD-BRAIN | HD-ADMIN | kpiSnapshot, timestamp, correlationId | internal |
| `brain.automation.request_submitted` | HD-BRAIN | n8n (via catalog) | workflowId, requestedBy, correlationId | internal |

## Consumed Events

| Event | Consumer | Source | Action Taken |
|---|---|---|---|
| `crm.client.overdue_detected` | HD-BRAIN | HD-CRM | Update risk model, potentially trigger alert |
| `crm.client.risk_flagged` | HD-BRAIN | HD-CRM | Correlate with cross-platform signals |
| `crm.payment_commitment.fulfilled` | HD-BRAIN | HD-CRM | Update KPI metrics |
| `rh.candidate.status_changed` | HD-BRAIN | HD-RH | Update workforce KPIs |
| `operations.task.completed` | HD-BRAIN | HD-OPERATIONS | Update productivity KPIs |
| `admin.finance.anomaly_detected` | HD-BRAIN | HD-ADMIN | Correlate financial risk signals |
| `web.lead.submitted` | HD-BRAIN | HD-WEB | Update acquisition funnel KPIs |

## Rules

1. BRAIN_AGENT never writes events that mutate domain entities on other platforms.
2. All consumed events must be processed idempotently.
3. BRAIN_AGENT recommendations do not auto-execute; they enter a human review queue.
4. Every recommendation event must include `correlationId` linking back to the originating signal.
