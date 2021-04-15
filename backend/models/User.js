import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        // required: [true, 'please add a full name']
    },
    userName: {
        type: String,
        unique: true,
        required: [true, 'please add a username']
    },
    email: {
        type:String,
        required: [true, 'please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    bio:{
        type: String,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    following:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    profilePicture:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Encrypt password using bcryptjs
UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id },  process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;