import express from "express";
import mongoose from "mongoose";
import { Treatment } from "../models/treatmentModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (
            !req.body.patientId ||
            !req.body.doctorId
        ) {
            return res.status(400).send({ message: "Please fill in Patient ID" });
        }
        const newTreatment = {
            _id: new mongoose.Types.ObjectId(),
            date: req.body.date,
            symptoms: req.body.symptoms,
            diagnosis: req.body.diagnosis,
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            medicine: req.body.medicine,
            description: req.body.description,
        };
        const treatment = await Treatment.create(newTreatment);
        return res.status(201).send(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);
router.get("/", async (req, res) => {
    try {
        const treatments = await Treatment.find({});
        return res.status(200).json({
            count: treatments.length,
            data: treatments
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);
// Find recent treatment by patientId
router.get("/patient/recent/:id", async (req, res) => {
    try {
        const treatment = await Treatment.find({ patientId: req.params.id })
            .sort({ date: -1 })
            .limit(1);
        if (!treatment) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        return res.status(200).json(treatment[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);

// Find by patientId
router.get("/patient/:id", async (req, res) => {
    try {
        const treatment = await Treatment.find({ patientId: req.params.id });
        if (!treatment) {
            return res.status(404).json({ message: "Treatment not found" });
        }
        return res.status(200).json(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const treatment = await Treatment.findByIdAndUpdate(id, req.body);
        if (!treatment) {
            return res.status(404).json({ message: 'Treatment not found' });
        }
        return res.status(200).json(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);

export default router;

