import { NextFunction, Request, Response } from "express";

/**
 * HD-BRAIN audit log middleware stub.
 * TODO: Replace with real AuditEntry persistence to the audit DB (separate from operational data).
 * HD-BRAIN is strictly read-only across other domains; the only mutation it owns is its
 * own decision log, which still must produce an AuditEntry per HD-CORE contracts.
 */
export function auditLog(req: Request, _res: Response, next: NextFunction) {
  // Stub: log to console only — wire to audit DB in production
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    console.log(`[AUDIT STUB] ${req.method} ${req.path}`, {
      ip: req.ip,
      at: new Date().toISOString(),
    });
  }
  next();
}
