import mongoose from 'mongoose';

const lotSchema = mongoose.Schema({
    stock: Number,
    lotNumber: String,
    dateImported: Date,
    expirationDate: Date,
});

const medicineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    brandName: String,
    description: String,
    dosage: String, //Liều lượng (vd: 100mg)
    unit: String, //(mg, g, ml)
    dosageForm: String, //Dạng thuốc (con nhông, dung dịch,...)(tablets, capsules, syrup,...)
    lot: [lotSchema], // Lô hàng
});

export const Medicine = mongoose.model('Medicine', medicineSchema);