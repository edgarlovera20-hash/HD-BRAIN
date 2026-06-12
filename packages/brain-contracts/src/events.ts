export const brainEvents = {
  riskDetected: "brain.risk.detected",
  recommendationCreated: "brain.recommendation.created",
  automationRequested: "brain.automation.requested",
  decisionRecorded: "brain.decision.recorded",
  kpiSnapshotCreated: "brain.kpi_snapshot.created"
} as const;

export type BrainEventName = typeof brainEvents[keyof typeof brainEvents];
