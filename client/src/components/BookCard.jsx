import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({book, role}) => {
    const {name, author, imageUrl, contentUrl} = book;

    const navigate = useNavigate()
    
    
    const handleReadClick = (e) =>{
      e.preventDefault()
      axios.post(`http://localhost:3001/book/fetch`,{name, author, imageUrl,contentUrl})
      .then(res => {
        if(res.data.fetched)
        {
          navigate('/contentUrl')
        }
        console.log(res)
       })
      .catch(err => console.log(err))
      
    }
  return (
    <div className='book-card'>
        <img src={imageUrl} alt={name} className='book-image'/>
        <div className="book-details">
            <h3>{name}</h3>
            <p>{author}</p>
            {role === "student" &&
        <div className="book-actions">
            <button onClick={handleReadClick} className='btn-link'>Read </button>
            </div>}
        </div>
        {role === "admin" &&
        <div className="book-actions">
        <button><Link to={`/book/${book._id}`} className='btn-link'>edit</Link></button>
        <button><Link to={`/delete/${book._id}`} className='btn-link'>delete</Link></button>
    </div>}
        
    </div>
  )
}

export default BookCard