import crypto from 'crypto';
import Data from '../models/data.model.js';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-ctr';
const secretKey = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};

const add = async (req, res) => {
    try {
        const { username, website, password } = req.body;

        const userId = req.userId;
        
        const existingEntry = await Data.findOne({ username, website });

        if (existingEntry) {
            return res.status(400).json({ error: 'Credentials already exist!' });
        }

        const encryptedPassword = encrypt(password);

        const newData = new Data({
            userId,
            username,
            website,
            password: encryptedPassword
        });
        await newData.save();

        res.status(201).json({ message: 'Credentials registered successfully!' });
    } catch (err) {
        console.error('Add credentials error: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const remove = async (req, res) => {
    try {
        const { username, website } = req.body;

        if (!username || !website) {
            return res.status(400).json({ error: 'Invalid request. Username and website are required.' });
        }
        const existingUser = await Data.findOne({ username, website });

        if (!existingUser) {
            return res.status(404).json({ error: 'Credentials not found. Cannot delete.' });
        }

        await Data.findOneAndDelete({ username, website });

        res.status(200).json({ message: 'Credentials removed successfully!' });
    } catch (err) {
        console.error('Remove credentials error: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAll = async (req, res) => {
    try {
        const userId = req.userId;
        const data = await Data.find({ userId });
        const decryptedData = data.map(item => ({
            ...item.toObject(),
            password: decrypt(item.password)
        }));
        res.status(200).json(decryptedData);
    } catch (err) {
        console.error('Fetch credentials error: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export default { add, remove, getAll };
