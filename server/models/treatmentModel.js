import mongoose from 'mongoose';

const treatmentSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        symptoms: String,
        diagnosis: String,
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        medicine: [{
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine',
            },
            quantity: Number,
        }],
        description: String,
        date: Date,
    }
);

export const Treatment = mongoose.model('Treatment', treatmentSchema);