import mongoose from 'mongoose';

const medicalRecordScheme = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        doctorId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        }],
        date: Date,
        symptoms: String,
        diagnosis: String,
    }
);


export const medicalRecord = mongoose.model('MedicalRecord', medicalRecordScheme);