import express from "express";
import { Patient } from '../models/patientModel.js';
import mongoose from 'mongoose';
const router = express.Router();

// Route for creating a new patient member
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.lastName ||
            !req.body.firstName
        ) {
            return res.status(400).send({ message: 'Fill in the required fields' })
        }

        const newPatient = {
        _id: new mongoose.Types.ObjectId(),
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        dob: req.body.dob,
        gender: req.body.gender,
        address: {
            province: req.body.address.province,
            district: req.body.address.district,
            ward: req.body.address.ward
        },
        contactInfo: {
            phone: req.body.contactInfo.phone,
            email: req.body.contactInfo.email
        },
        emergencyContact: {
            lastName: req.body.emergencyContact.lastName,
            firstName: req.body.emergencyContact.firstName,
            relationship: req.body.emergencyContact.relationship,
            phone: req.body.emergencyContact.phone,
        }

        }
        const patient = await Patient.create(newPatient);
        res.status(201).json(patient);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

// Route for retrieving all Patient members
router.get('/', async (req, res) => {
    try {
        const patient = await Patient.find();
        res.status(200).json(patient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific patient member by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient member not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

// Route for updating a patient member by ID
router.post('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient member not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for deleting a patient member by ID
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient member not found' });
        }
        res.status(200).json({ message: 'Patient member deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;