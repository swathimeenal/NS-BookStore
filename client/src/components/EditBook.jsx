import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/AxiosInstance";

const EditBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [pdfFile, setPdfFile] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const handleImage = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        console.log(base64Image);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handlePdf = (e) => {
    const uploadedPDF = e.target.files[0];

    console.log("pdf - ", uploadedPDF);
    if (uploadedPDF) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64PDF = reader.result;
        // files.push({ sample: base64PDF });
        setPdfFile(base64PDF);
        console.log(base64PDF);
      };
      reader.readAsDataURL(uploadedPDF);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/book/book/" + id)
      .then((res) => {
        setName(res.data.name);
        setAuthor(res.data.author);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { name: name, author: author };

    if (image !== "") {
      data.image = image;
    }
    if (pdfFile !== "") {
      data.pdfFile = pdfFile;
    }

    axiosInstance
      .put("/book/book/" + id, data)
      .then((res) => {
        if (res.data.updated) {
          navigate("/books");
        } else {
          toast.error("error");
        }
      })
      .catch((err) => toast.error("Can't get Updated"));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input
            type="text"
            id="book"
            name="book"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Content:</label>
          <input
            type="file"
            id="form-control"
            accept="application/pdf"
            onChange={handlePdf}
          />
        </div>

        <button type="submit">Update </button>
      </form>
    </div>
  );
};

export default EditBook;