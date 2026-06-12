import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./server/routes/auth.js";
import healthRoutes from "./server/routes/health.js";
import insightsRoutes from "./server/routes/insights.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3003;
const isDev = process.env.NODE_ENV !== "production";

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", healthRoutes);
app.use("/api", insightsRoutes);

if (!isDev) {
  const clientDist = path.join(__dirname, "dist/client");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/api/ping", (_req, res) => res.json({ ok: true, env: "dev" }));
}

app.listen(PORT, () => {
  console.log(`HD-BRAIN server running on port ${PORT}`);
});

export default app;
