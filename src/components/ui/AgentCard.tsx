import { Play, Settings, Terminal, Clock, CheckCircle } from "../../design-system/icons";

export type AgentStatus = "running" | "idle" | "error" | "paused";

interface AgentCardProps {
  name: string;
  id: string;
  role?: string;
  status: AgentStatus;
  model: string;
  lastRun: string;
  totalRuns: number;
  successRate: number;
  onRun?: () => void;
  onConfig?: () => void;
  onLogs?: () => void;
}

const STATUS_CONFIG: Record<AgentStatus, { label: string; color: string; dotColor: string; bgColor: string }> = {
  running: { label: "Activo", color: "text-[#10B981]", dotColor: "bg-[#10B981]", bgColor: "bg-[#10B981]/10" },
  idle: { label: "En espera", color: "text-[#94A3B8]", dotColor: "bg-[#94A3B8]", bgColor: "bg-white/5" },
  error: { label: "Error", color: "text-[#EF4444]", dotColor: "bg-[#EF4444]", bgColor: "bg-[#EF4444]/10" },
  paused: { label: "Pausado", color: "text-[#F59E0B]", dotColor: "bg-[#F59E0B]", bgColor: "bg-[#F59E0B]/10" },
};

export function AgentCard({
  name,
  id,
  role,
  status,
  model,
  lastRun,
  totalRuns,
  successRate,
  onRun,
  onConfig,
  onLogs,
}: AgentCardProps) {
  const statusCfg = STATUS_CONFIG[status];

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 hover:border-white/[0.15] transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
            {name}
          </h3>
          {role && <p className="text-[#94A3B8] text-xs mt-0.5 truncate">{role}</p>}
          <p className="text-[#94A3B8] text-[10px] mt-0.5 font-mono">{id}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusCfg.color} ${statusCfg.bgColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor} ${status === "running" ? "animate-pulse" : ""}`} />
          {statusCfg.label}
        </div>
      </div>

      {/* Model badge */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#38BDF8] text-xs font-mono">
          {model}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center bg-white/[0.04] rounded-xl py-2 px-1">
          <span className="text-white text-sm font-bold">{successRate}%</span>
          <span className="text-[#94A3B8] text-[10px] mt-0.5 flex items-center gap-0.5">
            <CheckCircle className="w-2.5 h-2.5" />
            Éxito
          </span>
        </div>
        <div className="flex flex-col items-center bg-white/[0.04] rounded-xl py-2 px-1">
          <span className="text-white text-sm font-bold">{totalRuns.toLocaleString("es-MX")}</span>
          <span className="text-[#94A3B8] text-[10px] mt-0.5">Ejecuciones</span>
        </div>
        <div className="flex flex-col items-center bg-white/[0.04] rounded-xl py-2 px-1">
          <span className="text-white text-[11px] font-bold truncate w-full text-center">{lastRun}</span>
          <span className="text-[#94A3B8] text-[10px] mt-0.5 flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5" />
            Último
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={onRun}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-[14px] transition-colors"
        >
          <Play className="w-3 h-3" />
          Ejecutar
        </button>
        <button
          onClick={onConfig}
          className="flex items-center justify-center gap-1 py-2 px-3 border border-white/[0.08] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white text-xs font-semibold rounded-[14px] transition-colors"
          title="Configurar"
        >
          <Settings className="w-3 h-3" />
        </button>
        <button
          onClick={onLogs}
          className="flex items-center justify-center gap-1 py-2 px-3 border border-white/[0.08] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white text-xs font-semibold rounded-[14px] transition-colors"
          title="Ver logs"
        >
          <Terminal className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
