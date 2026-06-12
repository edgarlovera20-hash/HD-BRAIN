import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getRecentEvents } from "../events/emitter.js";
import { requireEventBusSecret, ingestEvent, getObservedSignals } from "../events/ingest.js";

const router = Router();

router.get("/", requireAuth, (_req, res) => res.json(getRecentEvents()));

// GET /api/events/signals — BRAIN's derived knowledge store (read-only).
router.get("/signals", requireAuth, (_req, res) => res.json(getObservedSignals()));

// POST /api/events/ingest — receive cross-platform events from HD producers.
// Secured by x-event-bus-secret header matching EVENT_BUS_SECRET env var.
router.post("/ingest", requireEventBusSecret, (req, res) => {
  const result = ingestEvent(req.body);
  if (!result.ok) {
    return res.status(400).json({ error: result.error ?? "Invalid event envelope" });
  }
  return res.status(200).json({ received: true, signalId: result.signalId, warning: result.warning });
});

export default router;
