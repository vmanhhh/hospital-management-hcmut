import mongoose from 'mongoose';

const doctorScheme = mongooose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        lastName: String,
        firstName: String,
        role: String,
        department: String,
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
            streetAddress: String,
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
        }
    }
);

doctorScheme.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
};
doctorScheme.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}
doctorScheme.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

export const Doctor = mongoose.model('Doctor', doctorScheme);  // Export the model
