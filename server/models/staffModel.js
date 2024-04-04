import mongoose from 'mongoose';

const staffScheme = mongooose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        lastName: String,
        firstName: String,
        role: String,
        department: String,
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
        }
    }
);