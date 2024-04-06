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
            ref: 'Staff',
            required: true
        }],
        date: {
            type: Date,
            default: Date.now
        },
        symptoms: [String],
        diagnosis: [String],
        treatment: mongoose.Schema.Types.ObjectId,
    }
);


export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordScheme);