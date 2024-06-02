import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import dataRoutes from './routes/data.routes.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
dotenv.config();
cors();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Serve static files

app.use(express.static('backend/frontend'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/login.html');
});


app.use('/users', userRoutes);
app.use('/data', dataRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});