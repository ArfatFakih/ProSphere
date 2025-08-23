import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        requied: true,
        unique: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        requied: true
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("User", UserSchema);

export default User;