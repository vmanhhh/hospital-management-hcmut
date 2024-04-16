import Admin from '../models/adminModel.js'
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lastName: String,
    firstName: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const postAdmin = async (req, res) => {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
}

const getAdmin = async (req, res) => {
    const admin = await Admin.find();
    res.status(200).json(admin);
}

const getAdminById = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
}

const updateAdmin = async (req, res) => {
    const admin = await Admin.findByIdAndUpdate
        (req.params.id, req.body, {
        new: true
    });
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
}

export { postAdmin, getAdmin, getAdminById, updateAdmin };

