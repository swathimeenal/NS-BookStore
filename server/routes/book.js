import express from "express";
import multer from "multer";
import { Book } from "../models/Book.js";
import mongoose from "mongoose";
const router = express.Router();
import cors from "cors";
import { verifyAdmin } from "./auth.js";

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/nagarajanrajan/Desktop/Capstone Project/NS BookStore/client/src/uploads"
    );
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const PdfSchema = mongoose.model("Book");
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});


// Route for Handling file uploads
router.post("/add", upload.single("file"), verifyAdmin, async (req, res) => {
  const name = req.body.name;
  const author = req.body.author;
  const image = req.body.image;
  const pdfFile = req.body.pdf;

  console.log(pdfFile);
  try {
    await PdfSchema.create({
      name: name,
      author: author,
      image: image,
      pdfFile: pdfFile,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
  // if (req.file)
  //  {
  //       res.json({ message:"file uploaded successful "})
  // }
  //  else{
  //     res.json({ message:"error in file uploading "})
  //  }
});




// Get All books


router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, book });
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, book });
  } catch (err) {
    return res.json(err);
  }
});

export { router as bookRouter };
