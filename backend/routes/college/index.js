import express from 'express';
const router = express.Router();
import college from '../../modals/college.js';
import mongoose from 'mongoose';

router.post('/', (req, res) => {
    const clg = new college(req.body);
    clg.save();
    res.json({ status: "success", data: clg });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        const clg = await college.find({
            _id: req.params.id
        });
        if (!clg) {
            return res.status(404).send('The college with the given ID was not found.');
        }
        return res.json(clg);
    } else {
        return res.json({ status: 'error', message: 'The college with the given ID was not found.' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        let clg = await college.findOne({
            _id: id
        });
        if (!clg) {
            return res.json({ status: 'error', message: 'The college with the given ID was not found.' });
        }
        await college.findOneAndUpdate({ _id: id }, {
            $set: req.body
        });
        res.json({
            message: 'College updated successfully'
        });
    } else {
        return res.json({ status: 'error', message: 'The college with the given ID was not found.' });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        college.findOneAndDelete({
            _id: id
        }, (err, doc) => {
            if (err) {
                return res.status(404).send('The college with the given ID was not found.');
            }
            res.json({
                message: 'College deleted successfully'
            });
        });
    } else {
        return res.json({ status: 'error', message: 'The college with the given ID was not found.' });
    }
});

export default router;