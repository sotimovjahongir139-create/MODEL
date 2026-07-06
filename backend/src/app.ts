import path from "path";
import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorMiddleware } from "./middleware/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { categoriesRouter } from "./modules/categories/categories.routes";
import { modelsRouter } from "./modules/models/models.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes";
import { analyticsRouter } from "./modules/analytics/analytics.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/models", modelsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/analytics", analyticsRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorMiddleware);
