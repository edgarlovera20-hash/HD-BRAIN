import crypto from "crypto";
import { Router } from "express";
import { z } from "zod";
import { auditLog } from "../middleware/auditLog.js";
import { requireAuth, type AuthRequest } from "../middleware/requireAuth.js";
import type { Decision, Kpi, Recommendation, RiskSignal } from "../types.js";

const router = Router();

// HD-BRAIN is STRICTLY READ-ONLY over every other platform's data.
// The KPIs / risks / recommendations below are in-memory projections that, in
// production, would be aggregated from read-only event/API feeds. They are never
// written back to source platforms. The ONE mutation HD-BRAIN owns is its own
// decision log (POST /api/decisions) — that is BRAIN's own domain.

// --- Seed data ---

const KPIS: Kpi[] = [
  { id: "kpi_active_clients", label: "Clientes activos", value: 248, unit: "clientes", trend: "up", deltaPct: 6.4 },
  { id: "kpi_overdue_rate", label: "Tasa de morosidad", value: 12.3, unit: "%", trend: "down", deltaPct: -2.1 },
  { id: "kpi_open_vacancies", label: "Vacantes abiertas", value: 17, unit: "vacantes", trend: "up", deltaPct: 13.3 },
  { id: "kpi_tasks_completed", label: "Tareas completadas", value: 86, unit: "%", trend: "up", deltaPct: 4.2 },
  { id: "kpi_monthly_revenue", label: "Ingresos del mes", value: 1_245_000, unit: "MXN", trend: "up", deltaPct: 8.9 },
  { id: "kpi_response_time", label: "Tiempo de respuesta", value: 3.4, unit: "h", trend: "flat", deltaPct: 0.2 },
];

const RISKS: RiskSignal[] = [
  {
    id: "risk_overdue_spike",
    title: "Repunte de cuentas vencidas en el segmento premium",
    severity: "high",
    sourcePlatform: "HD-CRM",
    description:
      "8 cuentas premium superaron los 30 días de morosidad esta semana, +60% vs. el promedio mensual.",
    detectedAt: "2026-06-11T09:20:00.000Z",
  },
  {
    id: "risk_pipeline_stall",
    title: "Vacantes críticas sin candidatos en etapa final",
    severity: "medium",
    sourcePlatform: "HD-RH",
    description:
      "3 vacantes prioritarias llevan más de 21 días sin avanzar a entrevista final.",
    detectedAt: "2026-06-10T15:05:00.000Z",
  },
  {
    id: "risk_finance_anomaly",
    title: "Anomalía en egresos de tesorería",
    severity: "critical",
    sourcePlatform: "HD-ADMIN",
    description:
      "Patrón de egresos inusual detectado: 2 transacciones fuera del rango histórico esperado.",
    detectedAt: "2026-06-12T07:45:00.000Z",
  },
  {
    id: "risk_ops_backlog",
    title: "Acumulación de tareas operativas atrasadas",
    severity: "medium",
    sourcePlatform: "HD-OPERATIONS",
    description:
      "El backlog de tareas vencidas creció 22% en los últimos 7 días.",
    detectedAt: "2026-06-11T18:30:00.000Z",
  },
  {
    id: "risk_lead_drop",
    title: "Caída en captación de leads web",
    severity: "low",
    sourcePlatform: "HD-WEB",
    description:
      "Los leads provenientes del sitio público bajaron 9% respecto a la semana anterior.",
    detectedAt: "2026-06-09T11:10:00.000Z",
  },
];

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec_collections_focus",
    title: "Priorizar gestión de cobranza en cuentas premium",
    rationale:
      "El repunte de morosidad premium representa el mayor riesgo financiero a corto plazo; concentrar esfuerzos de cobranza ahí maximiza la recuperación.",
    priority: "high",
    targetPlatform: "HD-CRM",
    status: "pending",
  },
  {
    id: "rec_finance_review",
    title: "Revisar manualmente las anomalías de tesorería",
    rationale:
      "La anomalía crítica de egresos requiere validación humana inmediata antes de cualquier acción downstream.",
    priority: "high",
    targetPlatform: "HD-ADMIN",
    status: "pending",
  },
  {
    id: "rec_pipeline_unblock",
    title: "Desbloquear vacantes prioritarias estancadas",
    rationale:
      "Acelerar las entrevistas finales reduce el tiempo de contratación y el riesgo de perder candidatos.",
    priority: "medium",
    targetPlatform: "HD-RH",
    status: "reviewed",
  },
  {
    id: "rec_ops_rebalance",
    title: "Rebalancear carga de tareas operativas",
    rationale:
      "El crecimiento del backlog sugiere redistribuir tareas para mantener la productividad del equipo.",
    priority: "medium",
    targetPlatform: "HD-OPERATIONS",
    status: "pending",
  },
];

const DECISIONS: Decision[] = [
  {
    id: "dec_seed_1",
    title: "Aprobada campaña de cobranza dirigida a cuentas premium",
    rationale:
      "En respuesta al repunte de morosidad, se autorizó una campaña enfocada por el equipo de CRM.",
    linkedRecommendationId: "rec_collections_focus",
    correlationId: "11111111-1111-4111-8111-111111111111",
    decidedBy: "brain@heavenlydreams.com.mx",
    createdAt: "2026-06-11T12:00:00.000Z",
  },
  {
    id: "dec_seed_2",
    title: "Escalada de anomalía de tesorería a revisión humana",
    rationale:
      "La anomalía crítica fue derivada a finanzas para validación manual antes de cualquier acción.",
    linkedRecommendationId: "rec_finance_review",
    correlationId: "22222222-2222-4222-8222-222222222222",
    decidedBy: "brain@heavenlydreams.com.mx",
    createdAt: "2026-06-12T08:15:00.000Z",
  },
];

// --- Read-only endpoints ---

router.get("/kpis", requireAuth, (_req, res) => {
  res.json({ kpis: KPIS });
});

router.get("/risks", requireAuth, (_req, res) => {
  res.json({ risks: RISKS });
});

router.get("/recommendations", requireAuth, (_req, res) => {
  res.json({ recommendations: RECOMMENDATIONS });
});

router.get("/decisions", requireAuth, (_req, res) => {
  res.json({ decisions: DECISIONS });
});

// --- Decision log (BRAIN's OWN domain — the only permitted mutation) ---

const decisionSchema = z.object({
  title: z.string().min(3),
  rationale: z.string().min(3),
  linkedRecommendationId: z.string().nullable().optional(),
});

router.post("/decisions", requireAuth, auditLog, (req: AuthRequest, res) => {
  const parsed = decisionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Solicitud inválida" });
  }

  const correlationId = crypto.randomUUID();
  const decision: Decision = {
    id: `dec_${crypto.randomUUID()}`,
    title: parsed.data.title,
    rationale: parsed.data.rationale,
    linkedRecommendationId: parsed.data.linkedRecommendationId ?? null,
    correlationId,
    decidedBy: req.user?.email ?? "unknown",
    createdAt: new Date().toISOString(),
  };

  DECISIONS.unshift(decision);

  // Audit stub — in production this persists an immutable AuditEntry to the audit DB.
  // HD-BRAIN's decision log is its own domain, so appending here is permitted.
  console.log("[AUDIT STUB] decision.create", {
    auditId: crypto.randomUUID(),
    actorType: "user",
    actorId: req.user?.sub ?? "unknown",
    platform: "HD-BRAIN",
    action: "create",
    resourceType: "decision",
    resourceId: decision.id,
    correlationId,
    severity: "info",
    createdAt: decision.createdAt,
  });

  return res.status(201).json({ decision });
});

export default router;
