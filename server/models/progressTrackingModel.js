import mongoose from 'mongoose';


const progressTrackingScheme = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        weight: Number,
        bloodPressureSystolic: Number,
        bloodPressureDiastolic: Number,
        heartRate: Number,
        temperature: Number,
        symptoms: [String],
        note: String,
    }
);

export const ProgressTracking = mongoose.model('ProgressTracking', progressTrackingScheme);
// Path: server/models/staffModel.js
// Compare this snippet from server/routes/staffRoute.js:
// import express from "express";
// import { Staff } from '../models/staffModel.js';
// import mongoose from "mongoose";
// 