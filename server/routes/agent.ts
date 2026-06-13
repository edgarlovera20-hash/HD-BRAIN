import { Router } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/requireAuth.js";
import { runBrainAgent } from "../agents/brain-agent.js";

const router = Router();

const inputSchema = z.object({
  type: z.enum([
    "risk_assessment",
    "kpi_summary",
    "recommendation_generation",
  ]),
  platformContext: z.string().optional(),
});

// POST /api/agent/run — BRAIN_AGENT entry point (requireAuth enforced, read-only)
router.post("/run", requireAuth, (req: AuthRequest, res) => {
  try {
    const input = inputSchema.parse(req.body);
    const result = runBrainAgent(input, req.user?.sub ?? "unknown");
    return res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
});

export default router;
