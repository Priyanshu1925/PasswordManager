import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DataSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    username: { type: String, required: true },
    website: { type: String, required: true },
    password: {
        iv: { type: String, required: true },
        content: { type: String, required: true }
    }
});

export default mongoose.model('Data', DataSchema);
