import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


 const BookCard =({book, role})=>{
  
        const {name, author, image, pdfFile} = book;
        const navigate = useNavigate();
        
       
  return (
    <Card style={{ width: "250px", height: "auto" }}>
      <Card.Img variant="top" src={image} height="200px" width="200px" />
      <Card.Body>
        <Card.Title
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Card.Title>
        <Card.Subtitle>{author}</Card.Subtitle>
        {role === "student" && (
          <Button
            className="mt-2"
            variant="primary"
            onClick={() => {
              navigate("/readbook", { state: { book: pdfFile } });
            }}
          >
            Read
          </Button>
        )}

        {role === "admin" && (
          <div>
            <Button className="mt-2" variant="primary">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/book/${book._id}`}
              >
                Edit
              </Link>
            </Button>
            <Button className="mt-2" variant="primary">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/delete/${book._id}`}
              >
                Delete
              </Link>
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
    
  )
}

export default BookCard