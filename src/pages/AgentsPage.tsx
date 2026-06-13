import { useState } from "react";
import { Plus } from "../design-system/icons";
import { PageHeader } from "../components/ui/PageHeader";
import { AgentCard } from "../components/ui/AgentCard";
import type { AgentStatus } from "../components/ui/AgentCard";

interface AgentDef {
  name: string;
  id: string;
  role: string;
  status: AgentStatus;
  model: string;
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

const ALL_AGENTS: AgentDef[] = [
  { name: "CEO Agent", id: "agent-ceo-001", role: "Dirección estratégica y visión ejecutiva", status: "running", model: "gemma4:e4b", lastRun: "3m", totalRuns: 1243, successRate: 99.1 },
  { name: "COO Agent", id: "agent-coo-001", role: "Operaciones y eficiencia organizacional", status: "running", model: "gemma4:e4b", lastRun: "9m", totalRuns: 876, successRate: 97.4 },
  { name: "CFO Agent", id: "agent-cfo-001", role: "Análisis financiero y proyecciones", status: "idle", model: "gemma4:e4b", lastRun: "1h", totalRuns: 512, successRate: 98.2 },
  { name: "CMO Agent", id: "agent-cmo-001", role: "Marketing y adquisición de clientes", status: "running", model: "gemma4:e4b", lastRun: "15m", totalRuns: 743, successRate: 95.6 },
  { name: "CTO Agent", id: "agent-cto-001", role: "Tecnología e infraestructura", status: "idle", model: "gemma4:e4b", lastRun: "3h", totalRuns: 321, successRate: 99.7 },
  { name: "HR Agent", id: "agent-hr-001", role: "Recursos humanos y cultura", status: "idle", model: "gemma4:e4b", lastRun: "18m", totalRuns: 654, successRate: 98.7 },
  { name: "Sales Agent", id: "agent-sales-001", role: "Gestión de pipeline de ventas", status: "running", model: "gemma4:e4b", lastRun: "7m", totalRuns: 987, successRate: 96.3 },
  { name: "Customer Success Agent", id: "agent-cs-001", role: "Retención y satisfacción del cliente", status: "error", model: "gemma4:e4b", lastRun: "2h", totalRuns: 445, successRate: 88.1 },
  { name: "Legal Agent", id: "agent-legal-001", role: "Revisión legal y cumplimiento", status: "paused", model: "gemma4:e4b", lastRun: "1d", totalRuns: 198, successRate: 100.0 },
  { name: "Data Scientist Agent", id: "agent-ds-001", role: "Modelos predictivos y análisis", status: "idle", model: "gemma4:e4b", lastRun: "45m", totalRuns: 278, successRate: 91.5 },
  { name: "Operations Agent", id: "agent-ops-001", role: "Tareas y coordinación de operaciones", status: "running", model: "gemma4:e4b", lastRun: "12m", totalRuns: 1102, successRate: 94.2 },
  { name: "Recruitment Agent", id: "agent-rec-001", role: "Reclutamiento y evaluación de candidatos", status: "idle", model: "gemma4:e4b", lastRun: "30m", totalRuns: 367, successRate: 96.9 },
];

type FilterTab = "all" | AgentStatus;

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "running", label: "Activos" },
  { key: "idle", label: "En espera" },
  { key: "error", label: "Error" },
  { key: "paused", label: "Pausados" },
];

export function AgentsPage() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered = filter === "all" ? ALL_AGENTS : ALL_AGENTS.filter((a) => a.status === filter);

  const counts: Record<FilterTab, number> = {
    all: ALL_AGENTS.length,
    running: ALL_AGENTS.filter((a) => a.status === "running").length,
    idle: ALL_AGENTS.filter((a) => a.status === "idle").length,
    error: ALL_AGENTS.filter((a) => a.status === "error").length,
    paused: ALL_AGENTS.filter((a) => a.status === "paused").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agentes IA"
        description="Gestiona y monitorea todos los agentes de inteligencia artificial del ecosistema HD."
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Agente
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#161F33] border border-white/[0.08] rounded-[16px] w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filter === tab.key ? "bg-white/20 text-white" : "bg-white/[0.08] text-[#94A3B8]"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Agents grid */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center h-48 bg-[#161F33] border border-white/[0.08] rounded-[20px]">
          <p className="text-[#94A3B8] text-sm">No hay agentes en este estado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              id={agent.id}
              role={agent.role}
              status={agent.status}
              model={agent.model}
              lastRun={agent.lastRun}
              totalRuns={agent.totalRuns}
              successRate={agent.successRate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AgentsPage;
