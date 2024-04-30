import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import patientsRoute from './routes/patientsRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import medicalRecordRoute from './routes/medicalRecordRoute.js';
import medicineRoute from './routes/medicineRoute.js';
import treatmentRoute from './routes/treatmentRoute.js';
import progressTrackingRoute from './routes/progressTrackingRoute.js';
import equipmentRoute from './routes/equipmentRoute.js';
import notFound from './middleware/notFound.js';
import errorHandlerMiddleware from './middleware/errorMiddleware/index.js';


import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Middleware
app.use(express.json());



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
app.use('/patients', patientsRoute);
app.use('/doctors', doctorRoute);
app.use('/medicalRecords', medicalRecordRoute);
app.use('/medicines', medicineRoute);
app.use('/treatments', treatmentRoute);
app.use('/progressTracking', progressTrackingRoute);
app.use('/equipments', equipmentRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);
