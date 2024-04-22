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
    dateImported: Date,
    expirationDate: Date,
});

export const Medicine = mongoose.model('Medicine', medicineSchema);