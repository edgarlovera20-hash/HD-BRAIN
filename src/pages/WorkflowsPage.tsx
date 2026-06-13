import { Plus, Play, Edit, Clock, Zap, Activity, CheckCircle, AlertTriangle } from "../design-system/icons";
import { PageHeader } from "../components/ui/PageHeader";

type WorkflowStatus = "active" | "draft" | "paused" | "error";
type TriggerType = "webhook" | "schedule" | "event" | "manual";

interface WorkflowDef {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  lastRun: string;
  nextRun: string;
  triggerType: TriggerType;
  runsToday: number;
  successRate: number;
  n8nId: string;
}

const WORKFLOWS: WorkflowDef[] = [
  {
    id: "wf-001",
    name: "Lead Qualification",
    description: "Califica automáticamente leads entrantes desde el formulario web, los enruta al Sales Agent y crea el contacto en CRM si supera el score mínimo.",
    status: "active",
    lastRun: "hace 3 min",
    nextRun: "continuo",
    triggerType: "webhook",
    runsToday: 47,
    successRate: 97.8,
    n8nId: "WEB_LEAD_TO_CRM",
  },
  {
    id: "wf-002",
    name: "Email Triage",
    description: "Clasifica emails entrantes por urgencia y categoría, asigna al agente correspondiente y genera respuesta inicial si es FAQ.",
    status: "active",
    lastRun: "hace 11 min",
    nextRun: "continuo",
    triggerType: "webhook",
    runsToday: 89,
    successRate: 99.1,
    n8nId: "CRM_OVERDUE_ALERT",
  },
  {
    id: "wf-003",
    name: "Candidate Evaluation",
    description: "Recibe CV de candidatos, el HR Agent evalúa el perfil contra las vacantes activas y genera un reporte de compatibilidad con recomendación.",
    status: "active",
    lastRun: "hace 30 min",
    nextRun: "continuo",
    triggerType: "event",
    runsToday: 12,
    successRate: 100.0,
    n8nId: "RH_CANDIDATE_FOLLOWUP_DRAFT",
  },
  {
    id: "wf-004",
    name: "Risk Alert",
    description: "Monitorea señales de riesgo del ecosistema — cuentas vencidas, bajo NPS, anomalías operativas — y genera alerta para revisión humana.",
    status: "active",
    lastRun: "hace 1 hr",
    nextRun: "cada hora",
    triggerType: "schedule",
    runsToday: 8,
    successRate: 87.5,
    n8nId: "BRAIN_RISK_REVIEW_REQUEST",
  },
  {
    id: "wf-005",
    name: "Finance Anomaly",
    description: "Detecta anomalías en reportes financieros comparando contra baseline histórico. Genera AuditEntry y notifica al Finance Agent para análisis.",
    status: "paused",
    lastRun: "hace 6 hr",
    nextRun: "pausado",
    triggerType: "schedule",
    runsToday: 0,
    successRate: 91.3,
    n8nId: "ADMIN_FINANCE_ANOMALY_ALERT",
  },
  {
    id: "wf-006",
    name: "Operations Task Reminder",
    description: "Envía recordatorios de tareas vencidas al Operations Agent para re-priorización y notificación al equipo correspondiente.",
    status: "draft",
    lastRun: "—",
    nextRun: "—",
    triggerType: "manual",
    runsToday: 0,
    successRate: 0,
    n8nId: "OPERATIONS_TASK_REMINDER",
  },
];

const STATUS_CONFIG: Record<WorkflowStatus, { label: string; color: string; bg: string; dot: string; icon: React.ElementType }> = {
  active: { label: "Activo", color: "text-[#10B981]", bg: "bg-[#10B981]/10", dot: "bg-[#10B981] animate-pulse", icon: CheckCircle },
  draft: { label: "Borrador", color: "text-[#94A3B8]", bg: "bg-white/[0.05]", dot: "bg-[#94A3B8]", icon: Edit },
  paused: { label: "Pausado", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", dot: "bg-[#F59E0B]", icon: AlertTriangle },
  error: { label: "Error", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10", dot: "bg-[#EF4444]", icon: AlertTriangle },
};

const TRIGGER_CONFIG: Record<TriggerType, { label: string; icon: React.ElementType; color: string }> = {
  webhook: { label: "Webhook", icon: Zap, color: "text-[#38BDF8]" },
  schedule: { label: "Programado", icon: Clock, color: "text-[#A78BFA]" },
  event: { label: "Evento", icon: Activity, color: "text-[#F59E0B]" },
  manual: { label: "Manual", icon: Play, color: "text-[#94A3B8]" },
};

const SUMMARY_STATS = [
  { label: "Flujos Activos", value: "3", color: "text-[#10B981]" },
  { label: "Ejecuciones Hoy", value: "156", color: "text-white" },
  { label: "Tasa de Éxito", value: "95.1%", color: "text-[#0066FF]" },
  { label: "En Revisión", value: "2", color: "text-[#F59E0B]" },
];

export function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Flujos de Trabajo"
        description="Pipelines y automatizaciones autorizadas del ecosistema HD — impulsadas por n8n."
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Flujo
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="bg-[#161F33] border border-white/[0.08] rounded-[16px] px-5 py-4">
            <p className="text-[#94A3B8] text-xs font-medium mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: "Poppins, sans-serif" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {WORKFLOWS.map((wf) => {
          const statusCfg = STATUS_CONFIG[wf.status];
          const triggerCfg = TRIGGER_CONFIG[wf.triggerType];
          const TriggerIcon = triggerCfg.icon;

          return (
            <div
              key={wf.id}
              className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 hover:border-white/[0.15] transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-white font-semibold text-sm leading-snug"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {wf.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#64748B]">{wf.n8nId}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusCfg.color} ${statusCfg.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                  {statusCfg.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2">
                {wf.description}
              </p>

              {/* Meta row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[#94A3B8] text-[10px] mb-0.5">Trigger</p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${triggerCfg.color}`}>
                    <TriggerIcon className="w-3 h-3" />
                    {triggerCfg.label}
                  </div>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[#94A3B8] text-[10px] mb-0.5">Hoy</p>
                  <p className="text-white text-xs font-bold">{wf.runsToday} runs</p>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-3">
                  <p className="text-[#94A3B8] text-[10px] mb-0.5">Éxito</p>
                  <p className={`text-xs font-bold ${wf.successRate >= 95 ? "text-[#10B981]" : wf.successRate >= 80 ? "text-[#F59E0B]" : "text-[#94A3B8]"}`}>
                    {wf.successRate > 0 ? `${wf.successRate}%` : "—"}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Último: {wf.lastRun}
                  </span>
                  <span>Próximo: {wf.nextRun}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="flex items-center gap-1 py-1.5 px-3 border border-white/[0.08] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white text-xs font-medium rounded-xl transition-colors"
                    title="Editar flujo"
                  >
                    <Edit className="w-3 h-3" />
                    Editar
                  </button>
                  <button
                    disabled={wf.status === "draft"}
                    className="flex items-center gap-1 py-1.5 px-3 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors"
                    title="Ejecutar manualmente"
                  >
                    <Play className="w-3 h-3" />
                    Ejecutar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkflowsPage;
