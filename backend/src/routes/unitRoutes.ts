import { Router } from "express";
import prisma from "../prisma";

const router = Router();

// allowed values
const ALLOWED_TYPES = ["capsule", "cabin"];
const ALLOWED_STATUSES = [
  "Available",
  "Occupied",
  "Cleaning In Progress",
  "Maintenance Needed",
];

// GET /api/units?status=Available&type=capsule
router.get("/", async (req, res) => {
  const { status, type } = req.query as { status?: string; type?: string };

  const where: any = {};
  if (status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }
    where.status = status;
  }
  if (type) {
    if (!ALLOWED_TYPES.includes(type)) {
      return res.status(400).json({ error: "Invalid type filter" });
    }
    where.type = type;
  }

  const units = await prisma.unit.findMany({
    where,
    orderBy: { id: "asc" },
  });
  res.json(units);
});

// GET /api/units/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const unit = await prisma.unit.findUnique({ where: { id } });
  if (!unit) return res.status(404).json({ error: "Unit not found" });
  res.json(unit);
});

// POST /api/units
router.post("/", async (req, res) => {
  const { name, type } = req.body as { name?: string; type?: string };
  if (!name || !type) return res.status(400).json({ error: "Name and type required" });

  if (!ALLOWED_TYPES.includes(type)) {
    return res.status(400).json({ error: `Type must be one of: ${ALLOWED_TYPES.join(", ")}` });
  }

  const newUnit = await prisma.unit.create({
    data: {
      name,
      type,
      // status defaults to "Available" from Prisma schema if configured
    },
  });

  res.status(201).json(newUnit);
});

// PUT /api/units/:id (update status) with business rule and status validation
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: "Status required" });

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}` });
  }

  try {
    const unit = await prisma.unit.findUnique({ where: { id } });
    if (!unit) return res.status(404).json({ error: "Unit not found" });

    // Business rule: cannot go Occupied -> Available directly
    if (unit.status === "Occupied" && status === "Available") {
      return res.status(400).json({
        error:
          "Cannot change directly from Occupied to Available. Please set to Cleaning In Progress or Maintenance Needed first.",
      });
    }

    const updatedUnit = await prisma.unit.update({
      where: { id },
      data: { status },
    });

    res.json(updatedUnit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
