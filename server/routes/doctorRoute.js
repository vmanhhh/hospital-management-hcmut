import express from "express";
import { Doctor } from '../models/doctorModel.js';
const router = express.Router();

// Route for creating a new doctor member
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.lastName ||
            !req.body.firstName ||
            !req.body.role||
            !req.body.department||
            !req.body.dob ||
            !req.body.gender ||
            !req.body.citizenId
        ) {
            return res.status(400).send({ message: 'Fill in the required fields' })
        }

        const newDoctor = {
        _id: mongoose.Schema.Types.ObjectId,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        role: req.body.role,
        department: req.body.role,
        dob: req.body.dob,
        gender: req.body.gender,
        citizenId: req.body.citizenId,
        address: req.body.address,
        contactInfo: req.body.contactInfo,
        emergencyContact: req.body.emergencyContact,

        }
        const doctor = await Doctor.create(newDoctor);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

// Route for retrieving all Doctor members
router.get('/', async (req, res) => {
    try {
        const doctor = await Doctor.find();
        res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific doctor member by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor member not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

// Route for updating a doctor member by ID
router.patch('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor member not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for deleting a doctor member by ID
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor member not found' });
        }
        res.status(200).json({ message: 'Doctor member deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;