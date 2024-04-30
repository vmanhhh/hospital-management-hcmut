import mongoose from 'mongoose';


const equipmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    model: String,
    manufacturer: String,
    serialNumber: String,
    department: String,
    availability: String,
    maintenanceHistory:{
        date: Date,
        description: String,
        technician: String 
    }
})

export const Equipment = mongoose.model('Equipment', equipmentSchema);