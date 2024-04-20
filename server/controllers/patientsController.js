import { Patient } from '../models/patientModel.js';
const addNewPatient = async (req, res) => {
    try {
        // Check if data included required info
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
            citizenId: req.body.citizenId,
            address: req.body.address,
            contactInfo: req.body.contactInfo,
            emergencyContact: req.body.emergencyContact,
            medicalRecord: req.body.medicalRecord
        }
        const patient = await Patient.create(newPatient);
        return res.status(201).send(patient);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
const findPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patients = await Patient.findById(id);
        return res.status(200).json(patients);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json(patient);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

export { addNewPatient, getAllPatients, findPatientById, updatePatient };