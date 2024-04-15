import express from "express";
import { Equipment } from "../models/equipmentModel";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.type ||
            !req.body.quantity ||
            !req.body.condition
        ) {
            return res.status(400).send({ message: "Fill in the required fields" });
        }

        const newEquipment = {
            _id: mongoose.Schema.Types.ObjectId,
            name: req.body.name,
            model: req.body.model,
            manufacturer: req.body.manufacturer,
            serialNumber: req.body.serialNumber,
            department: req.body.department,
            status: req.body.status,
            availability: req.body.availability,
            maintenanceHistory: req.body.maintenanceHistory
        };
        const equipment = await Equipment.create(newEquipment);
        res.status(201).json(result);
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
