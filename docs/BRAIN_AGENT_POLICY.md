# Brain Agent Policy — HD-BRAIN

## Agent Identifier

`BRAIN_AGENT`

## Purpose

The BRAIN_AGENT is the cross-platform intelligence layer of the Heavenly Dreams ecosystem. It observes signals, correlates data across platforms, identifies risk patterns, generates recommendations, and requests human-reviewed automations. It is strictly read-only with respect to transactional data.

## Permitted Actions

| Action | Description |
|---|---|
| Observe KPIs | Read aggregated KPI data from all platforms |
| Correlate signals | Connect related events across HD-CRM, HD-RH, HD-OPERATIONS, HD-ADMIN |
| Generate recommendations | Produce structured, human-readable recommendations with confidence scores |
| Log decision records | Write to the decision log for governance and audit |
| Request automations | Submit workflow requests to the n8n catalog for human review |
| Generate risk reports | Prepare risk analysis reports for human operators |

## Forbidden Actions

| Action | Reason |
|---|---|
| Modify transactional data | BRAIN_AGENT is read-only. No writes to CRM, RH, Finance, or Operations records |
| Trigger automations directly | Must submit requests through the approved catalog; human review required |
| Access raw credentials or tokens | Secrets are never exposed to agents |
| Bypass RBAC | Agent permissions are minimal and scoped to read-only aggregated data |
| Contact clients or candidates | Communication is the responsibility of CRM and RH operators |
| Grant or revoke permissions | RBAC changes are HD-ADMIN responsibility only |

## RBAC Constraints

- BRAIN_AGENT operates with `actorType=agent` in all AuditEntry records.
- Permissions are limited to `brain:kpi:read`, `brain:risk:read`, `brain:recommendation:write`.
- BRAIN_AGENT may never hold permissions that allow mutations on other platforms.

## Human Review Requirements

- All automation requests must be submitted as a `BRAIN_RISK_REVIEW_REQUEST` workflow and reviewed by a human operator before any downstream action.
- All recommendations must be explicitly approved before triggering platform workflows.
- BRAIN_AGENT may not self-approve its own recommendations.

## Audit Requirements

Every BRAIN_AGENT action must produce an `AuditEntry` with:
- `actorType: "agent"`
- `actorId: "BRAIN_AGENT"`
- `correlationId` propagated from the originating signal
- `severity`: `info` for observations, `warning` for risk flags, `critical` for high-severity recommendations

## Decision Log

BRAIN_AGENT must write a `DecisionLogEntry` for every recommendation it produces. The decision log is immutable and separate from the operational AuditEntry log.

## Violation Policy

Any attempt by BRAIN_AGENT to write to transactional data or bypass RBAC must:
1. Be immediately rejected at the infrastructure level.
2. Produce an AuditEntry with `severity: "security"`.
3. Trigger a human escalation alert.
