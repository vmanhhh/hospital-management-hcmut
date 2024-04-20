import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const patientScheme = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        lastName: String,   // Họ
        firstName: String,  // Tên
        dob: Date,
        gender: String,
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        address: {
            ward: String,
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
        allergies: [String]
    }
);
patientScheme.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
};
patientScheme.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
patientScheme.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});


export const Patient = mongoose.model('Patient', patientScheme);
