import { hdEvents, hdPermissions, hdPlatforms } from "@hd/core-contracts";

export const brainCoreAlignment = {
  platform: hdPlatforms.brain,
  events: {
    riskDetected: hdEvents.brainRiskDetected,
    automationRequested: hdEvents.brainAutomationRequested,
    decisionRecorded: hdEvents.brainDecisionRecorded,
    auditActionRecorded: hdEvents.auditActionRecorded
  },
  permissions: {
    viewGlobalKpis: hdPermissions.brainViewGlobalKpis,
    viewRiskAlerts: hdPermissions.brainViewRiskAlerts,
    viewAuditLogs: hdPermissions.brainViewAuditLogs,
    automationRequest: hdPermissions.brainAutomationRequest
  }
} as const;
