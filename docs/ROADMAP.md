# Roadmap — HD-BRAIN

## Phase 1: Technical Foundation

- [ ] TypeScript + Node project setup
- [ ] Shared contracts from HD-CORE integrated
- [ ] Event bus consumer infrastructure
- [ ] tsconfig.json with strict mode
- [ ] CI/CD pipeline (typecheck + lint)
- [ ] .env.example documented

## Phase 2: Domain Model

- [ ] KPISnapshot entity (platform, metrics[], timestamp)
- [ ] RiskSignal entity (id, type, affectedPlatform, severity, correlationId)
- [ ] Recommendation entity (id, type, confidence, status, humanApprovedBy)
- [ ] DecisionLogEntry entity (immutable, linked to recommendations)
- [ ] AuditEntry integration from HD-CORE

## Phase 3: Event Consumption Layer

- [ ] Subscribe to all platform events (CRM, RH, OPERATIONS, ADMIN, WEB)
- [ ] Event processing pipeline with idempotency
- [ ] KPI aggregation engine
- [ ] Risk signal correlator

## Phase 4: Intelligence API

- [ ] REST API following docs/API_CONTRACT.md
- [ ] Read-only endpoints: KPIs, risks, recommendations
- [ ] JWT authentication middleware
- [ ] Human review approval flow for recommendations

## Phase 5: AI Agent Integration

- [ ] BRAIN_AGENT integration following docs/BRAIN_AGENT_POLICY.md
- [ ] Risk detection model (pattern-based, no transactional writes)
- [ ] Recommendation generator with confidence scoring
- [ ] Automation request submission to n8n catalog
- [ ] Human-in-the-loop approval enforcement

## Phase 6: Dashboard

- [ ] Cross-platform KPI dashboard (HD-ADMIN facing)
- [ ] Risk signal heatmap
- [ ] Recommendation queue with approve/reject UI
- [ ] Decision log viewer (immutable, audit-grade)

## Phase 7: Observability

- [ ] Decision log persistence (separate immutable store)
- [ ] AuditEntry persistence
- [ ] Metrics: recommendation acceptance rate, risk detection precision
- [ ] Alerting: critical risk threshold notifications

## Phase 8: Production Readiness

- [ ] Event bus reliability (at-least-once delivery, DLQ)
- [ ] Idempotency guarantees on event processing
- [ ] Disaster recovery for decision log
- [ ] Privacy review: no PII in KPI aggregations
- [ ] Security audit: BRAIN_AGENT read-only enforcement
