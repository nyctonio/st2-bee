import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongourl = process.env.MONGOURI || 'your monoogdb url';
const config = {
    useNewUrlParser: true,
};
mongoose.connect(mongourl, (err) => {
    if (err) {
        console.log('error in connecting to mongoose', err);
        return;
    }
    console.log('connected to mongoose on ');
});
