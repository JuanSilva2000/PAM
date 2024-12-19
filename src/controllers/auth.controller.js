import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userFound = await User.findOne({ where: { email } });
        if (userFound) return res.status(400).json({ message: "The email is already in use" });

        // Hashear la contraseña y crear el usuario
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: passwordHash });

        // Crear y enviar token
        const token = await createAccessToken({ id: newUser.id });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        res.json({ id: newUser.id, username, email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por correo
        const userFound = await User.findOne({ where: { email } });
        if (!userFound) return res.status(400).json({ message: "The email does not exist" });

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

        // Crear y enviar token
        const token = await createAccessToken({ id: userFound.id });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({ id: userFound.id, username: userFound.username, email: userFound.email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const verifyToken = async (req, res) => {
    console.log(req.cookies)
    const { token } = req.cookies;
    if (!token) return res.send(false);


    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);

        // Buscar usuario por ID
        const userFound = await User.findByPk(decoded.id);
        if (!userFound) return res.sendStatus(401);

        res.json({ id: userFound.id, username: userFound.username, email: userFound.email });
    } catch (err) {
        return res.sendStatus(401);
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'Strict'
    });
    return res.sendStatus(200);
};
