import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    brandName: String,
    description: String,
    dosage: String, //Liều lượng (vd: 100mg)
    unit: String, //(mg, g, ml)
    dosageForm: String, //Dạng thuốc (con nhông, dung dịch,...)(tablets, capsules, syrup,...)

    stock: Number,
    expDate: Date,
});

const equipmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    model: String,
    manufacturer: String,
    serialNumber: String,
    department: String,
    status: String,
    availability: {
        type: String,
        enum: ['Available', 'In Use', 'Under Maintenance', 'Reserved'],  // Define possible availability states
    },
    maintenanceHistory: [{
        date: Date,
        description: String,
        technician: String  
    }]
})