import express from 'express';
const route = express.Router();
import { User } from '../Model/Authmodel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

route.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "user already exist" });
    }
    const newuser = new User({ username, email, password });
    await newuser.save();
    return res.json({ message: 'user create' });
});

route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (password != user.password) {
            return res.json({ message: "incorrect password" });
        }
        const token = jwt.sign({ username: user.username }, 'jwttoken', { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
        return res.status(200).json({ status: true, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

route.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }
        const token = jwt.sign({ username: user.username }, "jwttokenkey", { expiresIn: '5h' });
        await User.findOneAndUpdate({ email: email }, { token });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'umar1920016967@gmail.com',
                pass: 'tqbm jdzl yotl fmto'
            }
        });

        var mailOptions = {
            from: 'umar1920016967@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click on the following link: http://localhost:3000/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log("Email sent:", info.response);
                return res.json({ status: true, message: "Email sent successfully" });
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

route.post('/reset', async (req, res) => {
    const token = req.body.token;
    const { password } = req.body;
    try {
        const verify = await jwt.verify(token, 'jwttokenkey');
        let user = await User.findOne({ username: verify.username });
        if (!user || !user.token) {
            return res.json({ success: false, message: 'Invalid token' });
        }

        await User.findOneAndUpdate({ username: verify.username }, { password: password, token: '' });
        return res.json({ success: true, message: "Updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default route;
