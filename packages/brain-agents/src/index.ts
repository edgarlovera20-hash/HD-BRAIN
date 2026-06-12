export type BrainAgentId =
  | "executive_brain_agent"
  | "risk_agent"
  | "automation_orchestrator_agent"
  | "data_quality_agent"
  | "security_watch_agent"
  | "operations_intelligence_agent"
  | "crm_intelligence_agent"
  | "finance_intelligence_agent"
  | "rh_intelligence_agent";

export interface AgentRunRequest {
  agentId: BrainAgentId;
  requestedBy: string;
  context: Record<string, unknown>;
  correlationId: string;
}

export interface AgentRunResult {
  agentId: BrainAgentId;
  summary: string;
  confidence: number;
  requiresHumanReview: boolean;
}

export function requiresHumanReview(confidence: number, sensitive: boolean): boolean {
  return sensitive || confidence < 0.85;
}
