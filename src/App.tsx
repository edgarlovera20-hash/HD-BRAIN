import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { DashboardShell } from "./components/layout/DashboardShell";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AgentsPage } from "./pages/AgentsPage";
import { MemoryPage } from "./pages/MemoryPage";
import { PromptsPage } from "./pages/PromptsPage";
import { WorkflowsPage } from "./pages/WorkflowsPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <DashboardPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedLayout>
            <AgentsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/memory"
        element={
          <ProtectedLayout>
            <MemoryPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/prompts"
        element={
          <ProtectedLayout>
            <PromptsPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/workflows"
        element={
          <ProtectedLayout>
            <WorkflowsPage />
          </ProtectedLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
