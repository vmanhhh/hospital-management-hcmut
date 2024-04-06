import express from "express";
import { Staff } from '../models/staffModel.js';

const router = express.Router();

// Route for creating a new staff member
router.post('/staff', async (req, res) => {
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

        const newStaff = {
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
        const staff = await Staff.create(newStaff);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

// Route for retrieving all staff members
router.get('/staff', async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for retrieving a specific staff member by ID
router.get('/staff/:id', async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
});

// Route for updating a staff member by ID
router.patch('/staff/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Route for deleting a staff member by ID
router.delete('/staff/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default router;