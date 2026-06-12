import {
  Activity,
  AlertTriangle,
  Lightbulb,
  LogOut,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Trend = "up" | "down" | "flat";

interface Kpi {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: Trend;
  deltaPct: number;
}

type RiskSeverity = "low" | "medium" | "high" | "critical";

interface RiskSignal {
  id: string;
  title: string;
  severity: RiskSeverity;
  sourcePlatform: string;
  description: string;
  detectedAt: string;
}

interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  priority: "low" | "medium" | "high";
  targetPlatform: string;
  status: "pending" | "reviewed";
}

const SEVERITY_STYLES: Record<RiskSeverity, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

const SEVERITY_LABEL: Record<RiskSeverity, string> = {
  critical: "Crítico",
  high: "Alto",
  medium: "Medio",
  low: "Bajo",
};

const PRIORITY_LABEL: Record<Recommendation["priority"], string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

function formatValue(kpi: Kpi): string {
  if (kpi.unit === "MXN") {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(kpi.value);
  }
  if (kpi.unit === "%") return `${kpi.value}%`;
  return `${kpi.value.toLocaleString("es-MX")} ${kpi.unit}`;
}

export default function DashboardPage() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [risks, setRisks] = useState<RiskSignal[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [kpiRes, riskRes, recRes] = await Promise.all([
          fetch("/api/kpis", { headers }),
          fetch("/api/risks", { headers }),
          fetch("/api/recommendations", { headers }),
        ]);

        if (kpiRes.status === 401 || riskRes.status === 401 || recRes.status === 401) {
          handleLogout();
          return;
        }
        if (!kpiRes.ok || !riskRes.ok || !recRes.ok) {
          throw new Error("fetch failed");
        }

        const kpiData = await kpiRes.json();
        const riskData = await riskRes.json();
        const recData = await recRes.json();

        if (!cancelled) {
          setKpis(kpiData.kpis ?? []);
          setRisks(riskData.risks ?? []);
          setRecommendations(recData.recommendations ?? []);
        }
      } catch {
        if (!cancelled) setError("No se pudieron cargar los datos de la torre de control.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-[#F9FAFB]">
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD Brain
          </span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#161F33] border border-[#334155] text-[#9CA3AF]">
            Solo lectura
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#9CA3AF] text-sm">{user?.email ?? "Brain"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Torre de Control
          </h1>
          <p className="text-[#9CA3AF] mt-1 text-sm">
            KPIs, señales de riesgo y recomendaciones del ecosistema HD
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-[#9CA3AF] text-sm">Cargando inteligencia…</p>
        ) : (
          <>
            {/* KPI cards */}
            <section className="mb-10">
              <h2 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4">
                Indicadores clave
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpis.map((kpi) => {
                  const TrendIcon =
                    kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
                  const trendColor =
                    kpi.trend === "up"
                      ? "text-[#10B981]"
                      : kpi.trend === "down"
                        ? "text-[#EF4444]"
                        : "text-[#9CA3AF]";
                  return (
                    <div
                      key={kpi.id}
                      className="bg-[#111827] border border-[#1F2937] rounded-xl p-5"
                    >
                      <p className="text-[#9CA3AF] text-sm mb-2">{kpi.label}</p>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#F9FAFB]">{formatValue(kpi)}</span>
                        <span className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
                          <TrendIcon className="w-4 h-4" />
                          {kpi.deltaPct > 0 ? "+" : ""}
                          {kpi.deltaPct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk signals */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  Señales de riesgo
                </h2>
                <div className="space-y-3">
                  {risks.map((risk) => (
                    <div
                      key={risk.id}
                      className="bg-[#111827] border border-[#1F2937] rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-[#F9FAFB] text-sm">{risk.title}</h3>
                        <span
                          className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${SEVERITY_STYLES[risk.severity]}`}
                        >
                          {SEVERITY_LABEL[risk.severity]}
                        </span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm mb-2">{risk.description}</p>
                      <div className="flex items-center justify-between text-xs text-[#6B7280]">
                        <span className="px-2 py-0.5 rounded bg-[#161F33] border border-[#334155] text-[#9CA3AF]">
                          {risk.sourcePlatform}
                        </span>
                        <span>{new Date(risk.detectedAt).toLocaleString("es-MX")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[#9CA3AF] uppercase tracking-wide mb-4">
                  <Lightbulb className="w-4 h-4" />
                  Recomendaciones
                </h2>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-[#111827] border border-[#1F2937] rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-[#F9FAFB] text-sm">{rec.title}</h3>
                        <span
                          className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${
                            rec.status === "reviewed"
                              ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                              : "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                          }`}
                        >
                          {rec.status === "reviewed" ? "Revisada" : "Pendiente"}
                        </span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm mb-2">{rec.rationale}</p>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <span className="px-2 py-0.5 rounded bg-[#161F33] border border-[#334155] text-[#9CA3AF]">
                          {rec.targetPlatform}
                        </span>
                        <span>Prioridad: {PRIORITY_LABEL[rec.priority]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
