// server/routes/solarLeads.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always save/read in: server/data/solar-leads
const DATA_DIR = path.join(__dirname, "..", "data", "solar-leads");

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function safeSlug(str) {
  return String(str || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// POST: save a lead
router.post("/solar-lead", (req, res) => {
  try {
    const payload = req.body;

    if (!payload?.contact?.fullName) {
      return res.status(400).json({ ok: false, error: "Missing contact.fullName" });
    }

    ensureDir();

    const slug = safeSlug(payload.contact.fullName);
    const filename = `lead-${slug}-${Date.now()}.json`;
    const fullPath = path.join(DATA_DIR, filename);

    fs.writeFileSync(
      fullPath,
      JSON.stringify(
        {
          createdAt: new Date().toISOString(),
          ...payload,
        },
        null,
        2
      ),
      "utf-8"
    );

    return res.json({ ok: true, savedAs: filename });
  } catch (err) {
    console.error("POST /solar-lead failed:", err);
    return res.status(500).json({ ok: false, error: "Server error saving lead" });
  }
});

// GET: list leads
router.get("/solar-leads", (req, res) => {
  try {
    ensureDir();

    const files = fs
      .readdirSync(DATA_DIR)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse();

    const leads = files.map((file) => {
      const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
      const data = JSON.parse(raw);
      return { file, ...data };
    });

    return res.json({ ok: true, count: leads.length, leads });
  } catch (err) {
    console.error("GET /solar-leads failed:", err);
    return res.status(500).json({ ok: false, error: "Server error reading leads" });
  }
});

export default router;
