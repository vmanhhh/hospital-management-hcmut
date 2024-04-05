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

router.get('/all', async (req, res) => {
    try {
        const patients = await Patient.find({});
        return res.status(200).json({
            count: patients.length,
            data: patients,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/search/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patients = await Patient.findById(id);
        return res.status(200).json(patients);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Patient.findByIdAndDelete(id);
        if (result) {
            return res.status(200).send({message: 'Patient deleted'})
        }
        return res.status(404).json({message:'Patient not found'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})
export default router;