// protect route
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: 'Unauthorized 1'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: 'Unauthorized 2'});
        }
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({error: 'Unauthorized 3'});
        }   
        req.userId = userId;
        req.user = user;
        next();
    } catch(err){
        console.log('Protect route error: ', err);
        res.status(500).json({error: 'Internal server error'});
    }
};
export default protectRoute;