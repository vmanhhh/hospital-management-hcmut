import express from "express";
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
            _id: mongoose.Schema.Types.ObjectId,
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            medicine: req.body.medicine,
            equipment: req.body.equipment,
            description: req.body.description,
            date: req.body.date
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
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const treatment = await Treatment.findById(id)
            .populate('patientId')
            .populate('doctorId')
            .populate('medicine')
            .populate('equipment')
            .exec();
        return res.status(200).json(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}
);
router.get('/patient/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const treatments = await
            Treatment.find({ patientId: id })
                .populate('patientId')
                .populate('doctorId')
                .populate('medicine')
                .populate('equipment')
                .exec();
        return res.status(200).json(treatments);
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

