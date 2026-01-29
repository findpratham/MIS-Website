// server/index.js
import express from "express";
import cors from "cors";
import solarLeadsRouter from "./routes/solarLeads.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Vite default
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", solarLeadsRouter);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
