export type PlatformHealth = "green" | "yellow" | "red" | "unknown";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RecommendationStatus =
  | "draft"
  | "review_required"
  | "approved"
  | "rejected"
  | "executed";

export interface GlobalKpiSnapshot {
  id: string;
  generatedAt: string;
  platformId: string;
  health: PlatformHealth;
  kpis: Record<string, number | string | boolean>;
}

export interface RiskSignal {
  id: string;
  sourcePlatform: string;
  title: string;
  description: string;
  level: RiskLevel;
  confidence: number;
  detectedAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  source: string;
  explanation: string;
  confidence: number;
  status: RecommendationStatus;
  requiresApproval: boolean;
  createdAt: string;
}

export interface DecisionLog {
  id: string;
  actorId: string;
  actorType: "user" | "service_principal" | "system";
  action: string;
  reason: string;
  sourcePlatform: string;
  createdAt: string;
}
