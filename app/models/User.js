import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username wajib di isi !"]
    },
    password: {
        type: String,
        required: [true, "Password wajib di isi !"]
    }
});

const User = model("User", userSchema);

export default User;