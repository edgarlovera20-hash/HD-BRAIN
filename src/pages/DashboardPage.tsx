import { Bot, Brain, Activity, Database, Zap, Clock } from "../design-system/icons";
import { MetricCard } from "../components/ui/MetricCard";
import { AgentCard } from "../components/ui/AgentCard";
import type { AgentStatus } from "../components/ui/AgentCard";

interface ActivityEntry {
  id: string;
  agent: string;
  action: string;
  status: "success" | "error" | "running";
  time: string;
  duration: string;
}

const RECENT_ACTIVITY: ActivityEntry[] = [
  { id: "1", agent: "CEO Agent", action: "Generó reporte ejecutivo semanal", status: "success", time: "hace 3 min", duration: "1.2s" },
  { id: "2", agent: "Sales Agent", action: "Clasificó 14 leads entrantes", status: "success", time: "hace 7 min", duration: "2.8s" },
  { id: "3", agent: "Operations Agent", action: "Procesó agenda del día", status: "success", time: "hace 12 min", duration: "0.9s" },
  { id: "4", agent: "HR Agent", action: "Evaluó 3 candidatos nuevos", status: "success", time: "hace 18 min", duration: "3.4s" },
  { id: "5", agent: "Finance Agent", action: "Detectó anomalía en reporte", status: "error", time: "hace 24 min", duration: "1.1s" },
  { id: "6", agent: "CEO Agent", action: "Actualizó KPIs del ecosistema", status: "success", time: "hace 31 min", duration: "0.7s" },
  { id: "7", agent: "Sales Agent", action: "Envió seguimiento a 5 prospectos", status: "success", time: "hace 40 min", duration: "1.5s" },
  { id: "8", agent: "Data Scientist", action: "Entrenó modelo de predicción", status: "running", time: "hace 45 min", duration: "—" },
  { id: "9", agent: "Operations Agent", action: "Generó tareas del equipo", status: "success", time: "hace 52 min", duration: "1.0s" },
  { id: "10", agent: "HR Agent", action: "Programó 2 entrevistas", status: "success", time: "hace 1 hr", duration: "0.8s" },
];

interface DashboardAgent {
  name: string;
  id: string;
  role: string;
  status: AgentStatus;
  model: string;
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

const DASHBOARD_AGENTS: DashboardAgent[] = [
  { name: "CEO Agent", id: "agent-ceo-001", role: "Dirección estratégica", status: "running", model: "gemma4:e4b", lastRun: "3m", totalRuns: 1243, successRate: 99.1 },
  { name: "Sales Agent", id: "agent-sales-001", role: "Gestión de ventas", status: "running", model: "gemma4:e4b", lastRun: "7m", totalRuns: 987, successRate: 96.3 },
  { name: "HR Agent", id: "agent-hr-001", role: "Recursos humanos", status: "idle", model: "gemma4:e4b", lastRun: "18m", totalRuns: 654, successRate: 98.7 },
  { name: "Operations Agent", id: "agent-ops-001", role: "Operaciones diarias", status: "running", model: "gemma4:e4b", lastRun: "12m", totalRuns: 1102, successRate: 94.2 },
  { name: "Finance Agent", id: "agent-fin-001", role: "Análisis financiero", status: "paused", model: "gemma4:e4b", lastRun: "2h", totalRuns: 433, successRate: 97.8 },
  { name: "Data Scientist", id: "agent-ds-001", role: "Ciencia de datos", status: "idle", model: "gemma4:e4b", lastRun: "45m", totalRuns: 278, successRate: 91.5 },
];

const STATUS_DOT: Record<ActivityEntry["status"], string> = {
  success: "bg-[#10B981]",
  error: "bg-[#EF4444]",
  running: "bg-[#0066FF] animate-pulse",
};

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <MetricCard
          title="Agentes Activos"
          value="7"
          change="+2"
          changeType="up"
          icon={Bot}
          color="#0066FF"
          description="de 12 agentes totales"
        />
        <MetricCard
          title="Ejecuciones Hoy"
          value="342"
          change="+47"
          changeType="up"
          icon={Activity}
          color="#00A3FF"
          description="vs ayer"
        />
        <MetricCard
          title="Tasa de Éxito"
          value="94.8%"
          change="+1.2%"
          changeType="up"
          icon={Zap}
          color="#10B981"
          description="promedio de todos los agentes"
        />
        <MetricCard
          title="Tiempo de Respuesta"
          value="1.3s"
          change="-0.2s"
          changeType="down"
          downIsGood
          icon={Clock}
          color="#38BDF8"
          description="promedio hoy"
        />
        <MetricCard
          title="Entradas de Memoria"
          value="12,847"
          change="+234"
          changeType="up"
          icon={Database}
          color="#A78BFA"
          description="en banco de memoria"
        />
        <MetricCard
          title="Tokens Usados Hoy"
          value="2.4M"
          change="+340K"
          changeType="up"
          icon={Brain}
          color="#F59E0B"
          description="across all agents"
        />
      </div>

      {/* Agents grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
            Agentes en Ejecución
          </h2>
          <a
            href="/agents"
            className="text-[#0066FF] text-sm font-medium hover:text-[#38BDF8] transition-colors"
          >
            Ver todos →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DASHBOARD_AGENTS.map((agent) => (
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
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Actividad Reciente
        </h2>
        <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] divide-y divide-white/[0.04]">
          {RECENT_ACTIVITY.map((entry) => (
            <div key={entry.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[entry.status]}`} />
              <div className="flex-1 min-w-0">
                <span className="text-white text-sm font-medium">{entry.agent}</span>
                <span className="text-[#94A3B8] text-sm"> — {entry.action}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[#94A3B8] text-xs font-mono">{entry.duration}</span>
                <span className="text-[#64748B] text-xs">{entry.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
