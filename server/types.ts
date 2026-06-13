// Server-only types for HD-BRAIN

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// --- Control tower domain types (read-only intelligence) ---

export type Trend = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: Trend;
  deltaPct: number;
}

export type RiskSeverity = "low" | "medium" | "high" | "critical";

export interface RiskSignal {
  id: string;
  title: string;
  severity: RiskSeverity;
  sourcePlatform: string;
  description: string;
  detectedAt: string;
}

export type RecommendationPriority = "low" | "medium" | "high";
export type RecommendationStatus = "pending" | "reviewed";

export interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  priority: RecommendationPriority;
  targetPlatform: string;
  status: RecommendationStatus;
}

export interface Decision {
  id: string;
  title: string;
  rationale: string;
  linkedRecommendationId: string | null;
  correlationId: string;
  decidedBy: string;
  createdAt: string;
}
