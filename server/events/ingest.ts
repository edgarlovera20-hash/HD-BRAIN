import { randomUUID } from "crypto";
import { z } from "zod";

const EVENT_BUS_SECRET = process.env.EVENT_BUS_SECRET ?? "";

export function requireEventBusSecret(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction
): void {
  if (!EVENT_BUS_SECRET) {
    console.warn("[INGEST] EVENT_BUS_SECRET not set — accepting all ingest requests");
    next();
    return;
  }
  const header = req.headers["x-event-bus-secret"];
  if (header !== EVENT_BUS_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

const envelopeSchema = z.object({
  eventId: z.string(),
  eventName: z.string(),
  correlationId: z.string(),
  occurredAt: z.string(),
  producer: z.string(),
  actor: z.object({
    id: z.string(),
    type: z.enum(["user", "agent", "system", "n8n_workflow", "service_principal"]),
  }),
  payload: z.record(z.string(), z.unknown()),
  schemaVersion: z.string().optional(),
  version: z.string().optional(),
});

type IngestEnvelope = z.infer<typeof envelopeSchema>;

export interface ObservedSignal {
  signalId: string;
  eventName: string;
  producer: string;
  correlationId: string;
  summary: string;
  derivedAt: string;
  payload: Record<string, unknown>;
}

const MAX_SIGNALS = 200;
const observedSignals: ObservedSignal[] = [];

function pushSignal(signal: Omit<ObservedSignal, "signalId" | "derivedAt">): ObservedSignal {
  const full: ObservedSignal = { signalId: randomUUID(), derivedAt: new Date().toISOString(), ...signal };
  observedSignals.push(full);
  if (observedSignals.length > MAX_SIGNALS) observedSignals.shift();
  console.log(`[BRAIN INGEST] signal derived eventName=${signal.eventName} correlationId=${signal.correlationId}`);
  return full;
}

export function getObservedSignals(): ObservedSignal[] {
  return [...observedSignals];
}

type HandlerFn = (env: IngestEnvelope) => void;

const handlers: Record<string, HandlerFn | undefined> = {
  "web.lead.submitted": (env) => {
    const p = env.payload as { name?: string; phone?: string };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `New lead from web: ${p.name ?? "unknown"}`, payload: env.payload });
  },
  "crm.payment_commitment.created": (env) => {
    const p = env.payload as { clientId?: string; amount?: number };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `Payment commitment client=${p.clientId ?? "?"} amount=${p.amount ?? "?"}`, payload: env.payload });
  },
  "operations.task.created": (env) => {
    const p = env.payload as { title?: string; assignee?: string };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `Task created: "${p.title ?? "?"}" → ${p.assignee ?? "?"}`, payload: env.payload });
  },
  "operations.task.status_changed": (env) => {
    const p = env.payload as { taskId?: string; fromStatus?: string; toStatus?: string };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `Task ${p.taskId ?? "?"}: ${p.fromStatus ?? "?"} → ${p.toStatus ?? "?"}`, payload: env.payload });
  },
  "rh.candidate.hired": (env) => {
    const p = env.payload as { candidateId?: string; vacancyId?: string };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `Candidate hired: candidateId=${p.candidateId ?? "?"} vacancyId=${p.vacancyId ?? "?"}`, payload: env.payload });
  },
  "admin.user.role_changed": (env) => {
    const p = env.payload as { userId?: string; fromRole?: string; toRole?: string };
    pushSignal({ eventName: env.eventName, producer: env.producer, correlationId: env.correlationId, summary: `Role change: user=${p.userId ?? "?"} ${p.fromRole ?? "?"} → ${p.toRole ?? "?"}`, payload: env.payload });
  },
};

export function ingestEvent(body: unknown): { ok: boolean; signalId?: string; warning?: string; error?: string } {
  const parsed = envelopeSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: "Invalid event envelope" };
  }
  const envelope = parsed.data;
  const handler = handlers[envelope.eventName];
  const prevLen = observedSignals.length;
  if (handler) {
    handler(envelope);
  } else {
    pushSignal({ eventName: envelope.eventName, producer: envelope.producer, correlationId: envelope.correlationId, summary: `Unrecognized event: ${envelope.eventName} from ${envelope.producer}`, payload: envelope.payload });
  }
  const signal = observedSignals.length > prevLen ? observedSignals[observedSignals.length - 1] : undefined;
  return { ok: true, signalId: signal?.signalId, warning: handler ? undefined : "unrecognized_event_type" };
}
