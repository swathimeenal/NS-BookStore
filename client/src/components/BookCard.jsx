import React  from 'react'
import { Link } from 'react-router-dom'


    const BookCard = ({book, role})=>{
        const {name, author, imageUrl, pdfFile} = book;
       
  return (
    <div class="container">
    <div class="col mb-5">
   <div class="card h-100">
   <div className="badge bg-dark text-white position-absolute" style={{top:"0.5rem", right:"0.5rem"}}></div>
   <img src={imageUrl} class="card-img-top" alt={name}/>
  
    <div class="card-body p-4">
            <h3 class="text-center">{name}</h3>
            <p class="fw-bolder">{author}</p>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div className="text-center"></div>
            {role === "student" &&
        <div className="book-actions">
            <button  className="btn btn-outline-dark mt-auto" onClick={()=> openPdf(book.pdfFile)} >Read </button>
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