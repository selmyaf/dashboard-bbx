import { Router } from "express";
import prisma from "../prisma";

const router = Router();

// GET all units
router.get("/", async (req, res) => {
  const units = await prisma.unit.findMany();
  res.json(units);
});

// POST new unit
router.post("/", async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: "Name and type required" });
  }
  const newUnit = await prisma.unit.create({
    data: { name, type },
  });
  res.status(201).json(newUnit);
});

// PUT update status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedUnit = await prisma.unit.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updatedUnit);
  } catch (err) {
    res.status(404).json({ error: "Unit not found" });
  }
});

export default router;
