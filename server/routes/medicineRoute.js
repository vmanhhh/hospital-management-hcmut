import express from "express";
import { Medicine } from '../models/medicineModel.js';

const router = express.Router();

router.post('/medicine',async (req, res)=>{
    try{
        if(
            !req.body.name||
            !req.body.brandName||
            !req.body.description||
            !req.body.dosage||
            !req.body.unit||
            !req.body.dosageForm
        ) {
            return res.status(400).send({message: 'Fill in the required fields'})
        }
        const lotArray = req.body.lot.map(lotData => ({
            stock: lotData.stock,
            lotNumber: lotData.lotNumber,
            dateImported: lotData.dateImported,
            expirationDate: lotData.expirationDate
          }));


        const newMedicine={
            _id: new mongoose.Type.ObjectId(),
            name: req.body.name,
            brandName: req.body.brandName,
            description: req.body.description,
            dosage: req.body.dosage,
            unit: req.body.unit,
            dosageForm: req.body.dosageForm,
            lot: lotArray
        }
        const medicine = await Medicine.create(newMedicine);
        res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(400).json({ message: error.message});
    }
});

// GET all medicines
router.get('/', async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.json(medicines);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET one medicine by ID
router.get('/:id', getMedicine, (req, res) => {
    res.json(res.medicine);
  });

  // Middleware function to get medicine object by ID
async function getMedicine(req, res, next) {
    let medicine;
    try {
      medicine = await Medicine.findById(req.params.id);
      if (medicine == null) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.medicine = medicine;
    next();
  }
  
  // PATCH (update) a medicine
  router.patch('/:id', getMedicine, async (req, res) => {
    if (req.body.name != null) {
      res.medicine.name = req.body.name;
    }
    if (req.body.brandName != null) {
      res.medicine.brandName = req.body.brandName;
    }
    if (req.body.description != null) {
      res.medicine.description = req.body.description;
    }
    if (req.body.dosage != null) {
      res.medicine.dosage = req.body.dosage;
    }
    if (req.body.unit != null) {
      res.medicine.unit = req.body.unit;
    }
    if (req.body.dosageForm != null) {
      res.medicine.dosageForm = req.body.dosageForm;
    }
    if (req.body.lot != null) {
      res.medicine.lot = req.body.lot;
    }
    try {
      const updatedMedicine = await res.medicine.save();
      res.json(updatedMedicine);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE a medicine
  router.delete('/:id', getMedicine, async (req, res) => {
    try {
      await res.medicine.remove();
      res.json({ message: 'Deleted Medicine' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;