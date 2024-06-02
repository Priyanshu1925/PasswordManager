import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const checkExistingUser = await User.findOne({username});

        if(checkExistingUser){
            return res.status(400).json({
                error: 'User already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({message: 'User registered successfully!'});
    } catch(err){
        console.log('Signup error: ', err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                error: 'User does not exist!'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){   
            return res.status(400).json({
                error: 'Invalid credentials!'
            });
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({message: 'Login successful!', jwt});
    } catch(err){
        console.log('Login error: ', err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const logout = async (req, res) => {
    try {
        // Check if session exists before destroying it
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    // Clear the token cookie
                    res.clearCookie('token');
                    res.status(200).json({ message: 'Logout successful!' });
                }
            });
        } else {
            // Session does not exist, treat as successful logout
            res.clearCookie('jwt');
            res.status(200).json({ message: 'Logout successful!' });
        }
    } catch (err) {
        console.log('Logout error: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default {signup, login, logout};