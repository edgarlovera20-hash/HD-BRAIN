import { NavLink, useNavigate } from "react-router-dom";
import {
  Brain,
  Bot,
  LayoutDashboard,
  Database,
  BookOpen,
  Layers,
  Workflow,
  Zap,
  Clock,
  Key,
  Server,
  Settings,
  Terminal,
  LogOut,
  BrainCircuit,
  Network,
  FileText,
} from "../../design-system/icons";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Visión General",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Agentes IA",
    items: [
      { label: "Agentes", path: "/agents", icon: Bot },
      { label: "Logs de Agentes", path: "/agent-logs", icon: Terminal },
      { label: "Skills & Tools", path: "/skills", icon: Zap },
    ],
  },
  {
    title: "Inteligencia",
    items: [
      { label: "Banco de Memoria", path: "/memory", icon: Database },
      { label: "Base de Conocimiento", path: "/knowledge", icon: BookOpen },
      { label: "RAG", path: "/rag", icon: Network },
    ],
  },
  {
    title: "Flujos de Trabajo",
    items: [
      { label: "Pipelines", path: "/workflows", icon: Workflow },
      { label: "Automatizaciones", path: "/automations", icon: BrainCircuit },
      { label: "Schedules", path: "/schedules", icon: Clock },
    ],
  },
  {
    title: "Configuración",
    items: [
      { label: "Prompts", path: "/prompts", icon: FileText },
      { label: "Modelos", path: "/models", icon: Layers },
      { label: "API Keys", path: "/api-keys", icon: Key },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Configuración", path: "/settings", icon: Settings },
      { label: "Logs del Sistema", path: "/logs", icon: Server },
    ],
  },
];

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111827] border-r border-white/[0.08] flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/[0.08] shrink-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)" }}
        >
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD BRAIN
          </p>
          <p className="text-[#94A3B8] text-[10px] mt-0.5">AI Operations Center</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="text-[#94A3B8] text-[10px] font-semibold uppercase tracking-widest px-3 mb-1.5">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]"
                        : "text-[#94A3B8] hover:bg-[#161F33] hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.08] shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#94A3B8] hover:bg-[#161F33] hover:text-white transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
