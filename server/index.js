import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import  './db.js'
import { AdminRouter } from './routes/auth.js'
import { studentRouter } from './routes/student.js'
import { Student } from './models/Student.js'
import { Admin } from './models/Admin.js'
import { bookRouter } from './routes/book.js'
import { Book } from './models/Book.js'
import bodyParser from 'body-parser'


//const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));



app.use(express.json())
app.use(cors({
    origin : ['http://localhost:5173', 'https://ns-bookstore-1.onrender.com'],
    credentials: true
}))
app.use(cookieParser())
dotenv.config()
app.use('/auth', AdminRouter)
app.use('/student', studentRouter)
app.use('/book', bookRouter)

app.get('/',(req, res)=>{
    try {
        //const home = await Book.find();
        console.log(req);
         res.status(200).send(` <h1><b>MERN STACK BOOK STORE APP</b></h1>`);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false
        });
      } 
})

app.get('/dashboard', async (req, res) => {
    try {
        const student = await Student.countDocuments()
        const admin = await Admin.countDocuments()
        const book = await Book.countDocuments()
        return res.json({ok: true, student, book, admin})
    } catch(err) {
        return res.json(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is Running");
})