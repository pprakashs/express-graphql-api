import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required!'],
        validate: [validator.isEmail, 'Please provide valid email!']
    },
    password: {
        type: String,
        required: [true, 'password must be required'],
        select: false,
        minlength: 8
    },
    contactNumber: [Number],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    joinedDate: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

export default User;