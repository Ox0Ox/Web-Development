import mongoose from "mongoose";
const Todoschema = new mongoose.Schema({
    name: String,
    desc: String,
    isdone: Boolean
});

export const Todo = mongoose.model('Todo', Todoschema)