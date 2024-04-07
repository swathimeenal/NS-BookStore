import express from 'express'
import multer from 'multer'
import {Book} from '../models/Book.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';


const app = express();
app.use(express.json());
app.use("/uploads",express.static("files"))


router.post('/add',verifyAdmin, async (req, res) => {
   
    try {
        const {name, author, imageUrl, pdfFile} = req.body;
        const storage = multer.diskStorage({
            destination : function (req, file, cb)
            {
               cb( null, '../uploads');// uploads will be stored in the 'upload/' directory
            },
            filename: function(req, file,cb)
            {
            cb(null, Date.now() + '-' + file.originalname);
            }
      })

        const newbook =  await Book.create({
            name,
            author,
            imageUrl,
            pdfFile  
         } );
           // Initilise multer upload middleware
           const upload = multer({ storage: storage,
            limits:{ filesize : 1000000}}).fields([{name: 'pdf', maxCount:1}]);
            // Route for file upload
            app.post ("/upload", upload.single("file"),async(req,res)=>{
                console.log(req.file);
                upload(req,res, (err) => {
                    console.log(req.file);
                    res.send("hi")
                    if(err){
                      console.error(err);
                      res.status(500).send('Error uploading files');
                    }
                    else{
                        res.send('Files uploaded')
                    }
                })
                console.log(req.file);
             res.send('File Uploaded Successfully'); // access uploaded file via req.file
            });
       
       

        await newbook.save()
        res.status(201).json("newBook");
       
    } catch(error) {
        console.log(error)
         res.status(400).json({message: "Error in adding book"})
    }
})

// Get All books
router.get('/books',async(req, res)=> {
    try{
        const books= await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});





router.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        return res.json(books)
    }catch(err) {
        return res.json(err)
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({_id: id})
        return res.json(book)
    }catch(err) {
        return res.json(err)
    }
})
router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({_id: id}, req.body)
        return res.json({updated: true, book})
    }catch(err) {
        return res.json(err)
    }
})

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({_id: id})
        return res.json({deleted: true, book})
    }catch(err) {
        return res.json(err)
    }
})

export {router as bookRouter}