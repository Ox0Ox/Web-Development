import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";

let conn = await mongoose.connect('mongodb://localhost:27017/Todo')

const app = express()
const port = 3008

app.get('/', (req, res) =>{
    const todo = new Todo({name: "New Title", desc: "New Description", isdone: false})
    todo.save()
    res.send('Hello World')
})

app.get('/a', async (req, res) =>{
    const todo = await Todo.findOne({})
    res.json(todo)
})

app.listen(port, () =>{
    console.log(`App running on port ${port}`);
})