import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    name: String,
    departments: [String],
    totalStudents: Number,
    address: String
});

const college = mongoose.model('college', collegeSchema);
export default college;