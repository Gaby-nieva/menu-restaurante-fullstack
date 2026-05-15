import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//  REGISTER

router.post("/register", async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
        });

        await newUser.save();

        res.json({message:"Usuario creado"});
    }
        catch (err) {
            res.status(500).json ({ error: err.message});
        } 
});


//  LOGIN

router.post("/login", async (req, res)=> {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if (!user) return res.status(400) .json({ message: "Usuario no existe"});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({message:"contraseña incorrecta"});

        const token = jwt.sign(
            { id: user._id, role: user.role},
            "secretKey",
            {expiresIn: "1h"}
        );

        res.json({token});
    }

    catch (err) {
        res.status(500) .json({error: err.message});
    }
});

export default router;