import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-in-production";
const JWT_EXPIRES_IN = "8h";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// In production this would query a real DB. For now, a hardcoded dev admin.
const DEV_ADMIN = {
  id: "user_dev_brain",
  email: "brain@heavenlydreams.com.mx",
  passwordHash: "$2b$10$dummy.hash.replace.with.real.bcrypt.hash",
  role: "admin",
  name: "Brain HD",
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // TODO: Replace with real DB lookup
    if (email !== DEV_ADMIN.email) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // In dev mode, accept a hardcoded password for testing
    const isDev = process.env.NODE_ENV !== "production";
    const DEV_PASSWORD = process.env.DEV_ADMIN_PASSWORD ?? "admin123";

    const valid = isDev
      ? password === DEV_PASSWORD
      : await bcrypt.compare(password, DEV_ADMIN.passwordHash);

    if (!valid) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { sub: DEV_ADMIN.id, email: DEV_ADMIN.email, role: DEV_ADMIN.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: { id: DEV_ADMIN.id, email: DEV_ADMIN.email, name: DEV_ADMIN.name, role: DEV_ADMIN.role },
    });
  } catch (error) {
    return res.status(400).json({ error: "Solicitud inválida" });
  }
});

router.post("/logout", (_req, res) => {
  // JWT is stateless — client discards token
  res.json({ ok: true });
});

export default router;
