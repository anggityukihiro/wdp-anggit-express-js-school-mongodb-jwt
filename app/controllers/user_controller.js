import User from "../models/User.js";
import {encrypt_password, verify_password, generate_jsonwebtoken} from "../service/auth_service.js";

export const register = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        let user = await User.findOne({username: username});
        if (user) {
            return res.status(406).json({message: "Username sudah digunakan"});
        }

        const encrypted_password = encrypt_password(password);

        await User.create({
            username: username,
            password: encrypted_password
        });

        return res.status(201).json({message: "User berhasil di buat"});
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        let user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({message: "Username tidak ditemukan!"});
        }

        const is_verify = verify_password(password, user.password);
        if (!is_verify) {
            return res.status(401).json({message: "Password tidak valid"});
        }

        const jsonwebtoken = generate_jsonwebtoken({
            username: user.username,
            _id: user._id
        })

        return res.status(200).json({token: jsonwebtoken});
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

