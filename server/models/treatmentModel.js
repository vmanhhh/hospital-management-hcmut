import mongoose from 'mongoose';

const treatmentSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: true
        },
        medicine: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
        }],
        equipment: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment',
        }],
        description: String,
        date: {
            type: Date,
            default: Date.now
        },
    }
);

const Treatment = mongoose.model('Treatment', treatmentSchema);