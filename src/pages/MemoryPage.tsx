import { Database, Download, Filter } from "../design-system/icons";
import { PageHeader } from "../components/ui/PageHeader";
import { DataTable } from "../components/ui/DataTable";

type MemoryStatus = "pending" | "approved" | "archived";
type MemoryType = "context" | "fact" | "preference" | "skill" | "event";

interface MemoryEntry {
  id: string;
  agent: string;
  key: string;
  content: string;
  type: MemoryType;
  confidence: number;
  status: MemoryStatus;
  created: string;
}

const MEMORY_DATA: MemoryEntry[] = [
  { id: "mem-001", agent: "CEO Agent", key: "strategic_priority_q2", content: "Enfoque principal en expansión de mercado LATAM y contratación de equipo de ventas", type: "fact", confidence: 0.97, status: "approved", created: "2026-06-13 08:15" },
  { id: "mem-002", agent: "Sales Agent", key: "lead_qualification_criteria", content: "Empresas con +50 empleados, sector manufactura o retail, presupuesto mínimo $50K MXN", type: "preference", confidence: 0.94, status: "approved", created: "2026-06-13 07:42" },
  { id: "mem-003", agent: "HR Agent", key: "candidate_eval_framework", content: "Priorizar candidatos con experiencia en startups, inglés B2+, disponibilidad inmediata", type: "skill", confidence: 0.91, status: "pending", created: "2026-06-13 09:01" },
  { id: "mem-004", agent: "Operations Agent", key: "daily_standup_format", content: "Reunión diaria 9am, 15 min máx, formato: ayer/hoy/bloqueadores", type: "preference", confidence: 0.99, status: "approved", created: "2026-06-12 17:30" },
  { id: "mem-005", agent: "Finance Agent", key: "anomaly_threshold_config", content: "Alerta si gasto diario supera 150% del promedio móvil de 7 días", type: "context", confidence: 0.88, status: "pending", created: "2026-06-13 06:55" },
  { id: "mem-006", agent: "Data Scientist Agent", key: "churn_model_v3_params", content: "Modelo XGBoost, features: recency, frequency, monetary, soporte NPS < 6", type: "skill", confidence: 0.93, status: "approved", created: "2026-06-12 14:20" },
  { id: "mem-007", agent: "CEO Agent", key: "board_meeting_notes_jun", content: "Junta directiva acordó expansión a Guadalajara Q3, presupuesto aprobado $2M MXN", type: "event", confidence: 0.98, status: "approved", created: "2026-06-11 16:00" },
  { id: "mem-008", agent: "Sales Agent", key: "competitor_pricing_intel", content: "Competidor X bajó precios 15% en paquete enterprise; responder con bundle de servicios", type: "fact", confidence: 0.85, status: "pending", created: "2026-06-13 10:12" },
  { id: "mem-009", agent: "Recruitment Agent", key: "open_positions_jun2026", content: "3 vacantes activas: Sales Manager, Sr. Developer, Marketing Lead — urgencia alta", type: "context", confidence: 0.96, status: "approved", created: "2026-06-10 09:00" },
  { id: "mem-010", agent: "Operations Agent", key: "team_productivity_baseline", content: "Promedio 87% completitud de tareas semanales; objetivo Q3: 92%", type: "fact", confidence: 0.90, status: "archived", created: "2026-05-31 18:00" },
  { id: "mem-011", agent: "HR Agent", key: "onboarding_checklist_v2", content: "12 pasos de onboarding: contrato, equipo, accesos, buddy asignado, capacitación 3 días", type: "skill", confidence: 0.99, status: "approved", created: "2026-06-01 11:00" },
  { id: "mem-012", agent: "Finance Agent", key: "vendor_payment_schedule", content: "Proveedor A: 15 de cada mes. Proveedor B: 28. Nómina: último día hábil del mes", type: "preference", confidence: 0.95, status: "archived", created: "2026-05-15 08:30" },
];

const STATUS_BADGE: Record<MemoryStatus, { label: string; cls: string }> = {
  pending: { label: "Pendiente", cls: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" },
  approved: { label: "Aprobado", cls: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" },
  archived: { label: "Archivado", cls: "bg-white/[0.05] text-[#94A3B8] border border-white/[0.08]" },
};

const TYPE_BADGE: Record<MemoryType, { label: string; cls: string }> = {
  context: { label: "Contexto", cls: "bg-[#0066FF]/10 text-[#38BDF8] border border-[#0066FF]/20" },
  fact: { label: "Hecho", cls: "bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20" },
  preference: { label: "Preferencia", cls: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" },
  skill: { label: "Habilidad", cls: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" },
  event: { label: "Evento", cls: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" },
};

const STATS = [
  { label: "Total Entradas", value: "12,847", color: "text-white" },
  { label: "Pendiente Aprobación", value: "3", color: "text-[#F59E0B]" },
  { label: "Aprobadas", value: "12,632", color: "text-[#10B981]" },
  { label: "Archivadas", value: "212", color: "text-[#94A3B8]" },
];

interface MemoryRow extends Record<string, unknown> {
  id: string;
  agent: string;
  key: string;
  content: string;
  type: MemoryType;
  confidence: number;
  status: MemoryStatus;
  created: string;
}

export function MemoryPage() {
  const rows: MemoryRow[] = MEMORY_DATA.map((m) => ({ ...m }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banco de Memoria"
        description="Entradas de memoria de todos los agentes IA — contexto, hechos y preferencias aprendidas."
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/[0.08] text-[#94A3B8] hover:bg-[#161F33] hover:text-white text-sm font-medium rounded-[14px] transition-colors">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-white/[0.08] text-[#94A3B8] hover:bg-[#161F33] hover:text-white text-sm font-medium rounded-[14px] transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        }
      />

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#161F33] border border-white/[0.08] rounded-[16px] px-5 py-4">
            <p className="text-[#94A3B8] text-xs font-medium mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: "Poppins, sans-serif" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Summary icon */}
      <div className="flex items-center gap-3 px-5 py-4 bg-[#0066FF]/[0.06] border border-[#0066FF]/20 rounded-[16px]">
        <Database className="w-5 h-5 text-[#38BDF8] shrink-0" />
        <p className="text-[#94A3B8] text-sm">
          Mostrando <span className="text-white font-medium">12 entradas recientes</span> de memoria. Las entradas pendientes requieren revisión manual antes de ser utilizadas por los agentes.
        </p>
      </div>

      {/* Data table */}
      <DataTable<MemoryRow>
        data={rows}
        columns={[
          {
            key: "agent",
            header: "Agente",
            width: "160px",
            render: (row) => (
              <span className="text-white font-medium text-sm">{row.agent}</span>
            ),
          },
          {
            key: "key",
            header: "Clave",
            width: "200px",
            render: (row) => (
              <span className="font-mono text-[#38BDF8] text-xs bg-[#0066FF]/10 px-2 py-0.5 rounded-lg border border-[#0066FF]/20">
                {row.key}
              </span>
            ),
          },
          {
            key: "content",
            header: "Contenido",
            render: (row) => (
              <span className="text-[#94A3B8] text-sm max-w-xs block truncate" title={row.content}>
                {row.content}
              </span>
            ),
          },
          {
            key: "type",
            header: "Tipo",
            width: "110px",
            render: (row) => {
              const cfg = TYPE_BADGE[row.type];
              return (
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.cls}`}>
                  {cfg.label}
                </span>
              );
            },
          },
          {
            key: "confidence",
            header: "Confianza",
            width: "100px",
            render: (row) => {
              const pct = Math.round(row.confidence * 100);
              const color = pct >= 95 ? "text-[#10B981]" : pct >= 85 ? "text-[#F59E0B]" : "text-[#EF4444]";
              return <span className={`text-sm font-semibold ${color}`}>{pct}%</span>;
            },
          },
          {
            key: "status",
            header: "Estado",
            width: "130px",
            render: (row) => {
              const cfg = STATUS_BADGE[row.status];
              return (
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.cls}`}>
                  {cfg.label}
                </span>
              );
            },
          },
          {
            key: "created",
            header: "Creado",
            width: "140px",
            render: (row) => (
              <span className="text-[#64748B] text-xs font-mono">{row.created}</span>
            ),
          },
        ]}
        emptyMessage="No hay entradas de memoria."
      />
    </div>
  );
}

export default MemoryPage;
