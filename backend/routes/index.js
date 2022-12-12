import express from 'express';
const router = express.Router();
import college from '../modals/college.js';
import mongoose from 'mongoose';
import collegeRouter from './college/index.js';

router.use('/college', collegeRouter);

router.get('/', (req, res) => {
    res.send('welocme to the project of st2-bee');
})

router.get('/colleges', async (req, res) => {
    const colleges = await college.find();
    res.json(colleges);
})


export default router;