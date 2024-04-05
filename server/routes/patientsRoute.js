import express from "express";
import { Patient } from '../models/patientModel.js';
import mongoose from "mongoose";

const router = express.Router();

// Route for adding a new patient
router.post('/new', async (req, res) => {
    try {
        // Check if data included required info
        if (
            !req.body.lastName ||
            !req.body.firstName ||
            !req.body.dob ||
            !req.body.gender ||
            !req.body.citizenId
        ) {
            return res.status(400).send({ message: 'Fill in the required fields' })
        }
        const newPatient = {
            _id: new mongoose.Types.ObjectId(),
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            dob: req.body.dob,
            gender: req.body.gender,
            citizenId: req.body.citizenId,
            address: req.body.address,
            contactInfo: req.body.contactInfo,
            emergencyContact: req.body.emergencyContact,
            medicalRecord: req.body.medicalRecord,
            allergies: req.body.allergies
        }
        const patient = await Patient.create(newPatient);
        return res.status(201).send(patient);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;