import express from "express";
import { Patient } from '../models/patientModel.js';
import { 
    addNewPatient,
    getAllPatients,
    findPatientById,

} from '../controllers/patientsController.js'
const router = express.Router();

// Route for adding a new patient
router.post('/', addNewPatient);

router.get('/', getAllPatients);

router.get('/:id', findPatientById);

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