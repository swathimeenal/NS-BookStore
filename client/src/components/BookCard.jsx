import React  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ReadBook from './ReadBook';

 const BookCard =({book, role})=>{
  
        const {name, author, image, pdfFile} = book;
        const navigate = useNavigate();
        
       
  return (
    <div className="container">
    <div className="col mb-5">
   <div className="card h-100">
   <div className="badge bg-dark text-white position-absolute" style={{top:"0.5rem", right:"0.5rem"}}></div>
   <img src={image} class="card-img-top" alt={name}/>
  
    <div class="card-body p-4">
            <h3 className="text-center">{name}</h3>
            <p className="fw-bolder">{author}</p>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div className="text-center"></div>
            {role === "student" &&
        <div className="book-actions">
            <button  className="btn btn-outline-dark mt-auto" onClick={ ()=>{navigate('/readbook',{state:{pdfFile}})}} >Read</button>
            
            </div>}
        </div>
        {role === "admin" &&
        <div className="book-actions">
        <button className="btn btn-outline-dark mt-auto"><Link to={`/book/${book._id}`} > Edit</Link></button>
        
        <button className="btn btn-outline-dark mt-auto"><Link to={`/delete/${book._id}`} >Delete</Link></button>
    </div>}
    </div>
    </div>
    </div>
    </div>
    
    
  )
}

export default BookCard