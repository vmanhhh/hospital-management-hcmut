import express from 'express';
import { medicalRecord } from '../models/medicalRecordModel';

const router = express.Router();

router.post('/',async(req,res)=> {
    try {
        if (
            !req.body.patientId ||
            !req.body.doctorId
        ){
            return res.status(400).send({message: "Please fill in Patient ID"})
        }
        const newMedicalRecord = {
            _id: mongoose.Schema.Types.ObjectId,
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
            date: req.body.date,
            symptoms: req.body.symptoms,
            diagnosis: req.body.diagnosis
        }
        const medicalRecord = await MedicalRecord.create(newMedicalRecord);
        return res.status(201).send(medicalRecord);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

router.get('/',async(req,res)=>{
    try {
        const medicalRecords = await MedicalRecord.find({});
        return res.status(200).json({
            count: medicalRecords.length,
            data: medicalRecords
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
}
);

router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const medicalRecords = await MedicalRecord.findById(id);
        return res.status(200).json(medicalRecords);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
}
);

router.get('/patient/:id',async(req,res)=>{
        const {id} = req.params;
        const medicalRecords = await medicalRecord.find({patientId:id})
        .populate('patientId')
        .populate('doctorId')
        .exec();
        res.status(200).json(medicalRecords);
}
);
