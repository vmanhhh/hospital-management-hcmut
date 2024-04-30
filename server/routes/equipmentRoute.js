import express from "express";
import mongoose from "mongoose";
import { Equipment } from "../models/equipmentModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (
            !req.body.name
        ) {
            return res.status(400).send({ message: "Fill in the required fields" });
        }

        const newEquipment = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            model: req.body.model,
            manufacturer: req.body.manufacturer,
            serialNumber: req.body.serialNumber,
            department: req.body.department,
            availability: req.body.availability,
            maintenanceHistory: {
                date: req.body.maintenanceHistory.date,
                description: req.body.maintenanceHistory.description,
                technician: req.body.maintenanceHistory.technician,
            },
        };
        const equipment = await Equipment.create(newEquipment);
        res.status(201).json(equipment);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
);
router.post('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(req.params);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json(equipment);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}
);
router.get("/:id", async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
);
router.delete('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        await equipment.remove();
        res.json({ message: "Equipment deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}
);
export default router;
