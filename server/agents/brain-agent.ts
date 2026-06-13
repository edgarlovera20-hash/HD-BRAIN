// BRAIN_AGENT — strictly read-only. NEVER writes to transactional data.
import { randomUUID } from "crypto";

export interface BrainAgentInput {
  type: "risk_assessment" | "kpi_summary" | "recommendation_generation";
  platformContext?: string;
}

export interface BrainAgentResult {
  agentId: "BRAIN_AGENT";
  correlationId: string;
  actorType: "agent";
  readOnly: true;
  input: BrainAgentInput;
  output: Record<string, unknown>;
  timestamp: string;
}

const FORBIDDEN_ACTIONS = [
  "write_transactional_data",
  "modify_clients",
  "modify_candidates",
  "modify_tasks",
  "modify_finance",
  "bypass_rbac",
];

const PERMITTED_ACTIONS = [
  "risk_assessment",
  "kpi_summary",
  "recommendation_generation",
];

export function runBrainAgent(
  input: BrainAgentInput,
  actorId: string,
): BrainAgentResult {
  const correlationId = randomUUID();

  if (!PERMITTED_ACTIONS.includes(input.type)) {
    console.warn(
      `[BRAIN_AGENT] FORBIDDEN action attempted: ${input.type} actor=${actorId} correlationId=${correlationId}`,
    );
    throw new Error(
      `BRAIN_AGENT: action '${input.type}' not permitted. Strictly read-only. Forbidden: ${FORBIDDEN_ACTIONS.join(", ")}`,
    );
  }

  console.log(
    `[AUDIT STUB] BRAIN_AGENT action=${input.type} actorId=${actorId} actorType=agent correlationId=${correlationId} platform=HD-BRAIN severity=info`,
  );

  const output: Record<string, unknown> = {
    analysis: `BRAIN_AGENT stub: ${input.type} completed`,
    readOnly: true,
    note: "BRAIN_AGENT never writes to transactional data. All findings are advisory.",
    requiresHumanReview: true,
  };

  return {
    agentId: "BRAIN_AGENT",
    correlationId,
    actorType: "agent",
    readOnly: true,
    input,
    output,
    timestamp: new Date().toISOString(),
  };
}
