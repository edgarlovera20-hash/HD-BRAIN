import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/agents": "Agentes IA",
  "/agent-logs": "Logs de Agentes",
  "/skills": "Skills & Tools",
  "/memory": "Banco de Memoria",
  "/knowledge": "Base de Conocimiento",
  "/rag": "RAG",
  "/workflows": "Flujos de Trabajo",
  "/automations": "Automatizaciones",
  "/schedules": "Schedules",
  "/prompts": "Biblioteca de Prompts",
  "/models": "Modelos",
  "/api-keys": "API Keys",
  "/settings": "Configuración",
  "/logs": "Logs del Sistema",
};

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "HD Brain";

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex">
      <Sidebar />
      {/* Main content shifted by sidebar width */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: "256px" }}>
        <Navbar title={title} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
