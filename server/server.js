import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import patientsRoute from './routes/patientsRoute.js';
const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Hello World');
});

app.use('/patients', patientsRoute);


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
