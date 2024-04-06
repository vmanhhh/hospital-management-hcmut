import mongoose from 'mongoose';

const patientScheme = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        lastName: String,   // Họ
        firstName: String,  // Tên
        dob: Date,
        gender: String,
        citizenId: String,
        address: {
            streetAddress: String,
            district: String,
            province: String
        },
        contactInfo: {
            phone: String,
            email: String
        },
        emergencyContact: {
            lastName: String,
            firstName: String,
            relationship: String,
            phone: String,
        },
        medicalRecord: [{
            medicalRecordId: mongoose.Schema.Types.ObjectId,
            ref: 'medicalRecord',
        }],
        allergies: [String]
    }
);

export const Patient = mongoose.model('Patient', patientScheme);
