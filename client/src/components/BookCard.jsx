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
      async function fetchData() {
        const apiUrl = contentUrl;
      try{
        const response = await fetch(`${apiUrl}`);
      
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

        const data = await response.json();

        if (response.data.fetch)
        {
          navigate('/apiUrl')
        }
        else 
        {
        console.log(res)
        }
      } 
      catch (error)
       {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerText = 'Error fetching data. Please try again later.';
      }
      
    }
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