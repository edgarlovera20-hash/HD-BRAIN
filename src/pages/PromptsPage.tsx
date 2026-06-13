import { Plus, Edit, Eye, Copy, FileText, Clock } from "../design-system/icons";
import { PageHeader } from "../components/ui/PageHeader";

interface PromptDef {
  id: string;
  name: string;
  agent: string;
  description: string;
  lastModified: string;
  charCount: number;
  version: string;
  tags: string[];
}

const PROMPTS: PromptDef[] = [
  {
    id: "prompt-ceo",
    name: "CEO Agent System Prompt",
    agent: "CEO Agent",
    description: "Define el rol ejecutivo estratégico del CEO Agent: visión, toma de decisiones de alto nivel, comunicación con el board y análisis ecosistémico.",
    lastModified: "2026-06-12 15:30",
    charCount: 4821,
    version: "v2.3",
    tags: ["estrategia", "ejecutivo", "decisiones"],
  },
  {
    id: "prompt-sales",
    name: "Sales Agent System Prompt",
    agent: "Sales Agent",
    description: "Instrucciones para clasificación de leads, seguimiento de oportunidades, análisis de pipeline y generación de propuestas comerciales.",
    lastModified: "2026-06-11 10:00",
    charCount: 3654,
    version: "v1.8",
    tags: ["ventas", "leads", "pipeline"],
  },
  {
    id: "prompt-hr",
    name: "HR Agent System Prompt",
    agent: "HR Agent",
    description: "Proceso de evaluación de candidatos, entrevistas estructuradas, onboarding y gestión del clima organizacional.",
    lastModified: "2026-06-10 14:15",
    charCount: 2987,
    version: "v1.5",
    tags: ["rrhh", "candidatos", "onboarding"],
  },
  {
    id: "prompt-ops",
    name: "Operations Agent System Prompt",
    agent: "Operations Agent",
    description: "Coordinación de tareas diarias, seguimiento de agenda, reportes de productividad y gestión de recursos del equipo.",
    lastModified: "2026-06-09 09:45",
    charCount: 2312,
    version: "v1.4",
    tags: ["operaciones", "tareas", "agenda"],
  },
  {
    id: "prompt-fin",
    name: "Finance Agent System Prompt",
    agent: "Finance Agent",
    description: "Análisis de reportes financieros, detección de anomalías, proyecciones de flujo de caja y monitoreo de presupuesto.",
    lastModified: "2026-06-08 16:20",
    charCount: 3201,
    version: "v2.0",
    tags: ["finanzas", "anomalías", "reportes"],
  },
  {
    id: "prompt-rec",
    name: "Recruitment Agent System Prompt",
    agent: "Recruitment Agent",
    description: "Búsqueda activa de candidatos, publicación de vacantes, filtrado de CVs y coordinación con el equipo de RRHH.",
    lastModified: "2026-06-07 11:10",
    charCount: 2765,
    version: "v1.2",
    tags: ["reclutamiento", "vacantes", "candidatos"],
  },
];

const AGENT_COLORS: Record<string, string> = {
  "CEO Agent": "#0066FF",
  "Sales Agent": "#10B981",
  "HR Agent": "#A78BFA",
  "Operations Agent": "#F59E0B",
  "Finance Agent": "#EF4444",
  "Recruitment Agent": "#38BDF8",
};

function formatCharCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k chars`;
  return `${n} chars`;
}

export function PromptsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Biblioteca de Prompts"
        description="System prompts y plantillas de instrucciones para cada agente IA del ecosistema."
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Prompt
          </button>
        }
      />

      {/* Summary stats */}
      <div className="flex items-center gap-6 px-5 py-4 bg-[#161F33] border border-white/[0.08] rounded-[16px]">
        <div>
          <p className="text-[#94A3B8] text-xs">Total Prompts</p>
          <p className="text-white text-xl font-bold">6</p>
        </div>
        <div className="w-px h-8 bg-white/[0.08]" />
        <div>
          <p className="text-[#94A3B8] text-xs">Versión más reciente</p>
          <p className="text-white text-xl font-bold">v2.3</p>
        </div>
        <div className="w-px h-8 bg-white/[0.08]" />
        <div>
          <p className="text-[#94A3B8] text-xs">Último modificado</p>
          <p className="text-white text-xl font-bold">Hoy</p>
        </div>
        <div className="w-px h-8 bg-white/[0.08]" />
        <div>
          <p className="text-[#94A3B8] text-xs">Caracteres totales</p>
          <p className="text-white text-xl font-bold">19.7k</p>
        </div>
      </div>

      {/* Prompt cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {PROMPTS.map((prompt) => {
          const agentColor = AGENT_COLORS[prompt.agent] ?? "#0066FF";
          return (
            <div
              key={prompt.id}
              className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 hover:border-white/[0.15] transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${agentColor}22` }}
                  >
                    <FileText className="w-5 h-5" style={{ color: agentColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-white font-semibold text-sm leading-snug truncate"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {prompt.name}
                    </h3>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: agentColor }}>
                      {prompt.agent}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/[0.06] text-[#94A3B8] border border-white/[0.08] shrink-0">
                  {prompt.version}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2">
                {prompt.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs text-[#94A3B8] bg-white/[0.05] border border-white/[0.06]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {prompt.lastModified}
                  </span>
                  <span>{formatCharCount(prompt.charCount)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="flex items-center gap-1 py-1.5 px-3 border border-white/[0.08] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white text-xs font-medium rounded-xl transition-colors"
                    title="Previsualizar"
                  >
                    <Eye className="w-3 h-3" />
                    Vista
                  </button>
                  <button
                    className="flex items-center gap-1 py-1.5 px-3 border border-white/[0.08] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white text-xs font-medium rounded-xl transition-colors"
                    title="Duplicar"
                  >
                    <Copy className="w-3 h-3" />
                    Duplicar
                  </button>
                  <button
                    className="flex items-center gap-1 py-1.5 px-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold rounded-xl transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-3 h-3" />
                    Editar
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

export default PromptsPage;
