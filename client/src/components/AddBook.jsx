import React,{ useState  }from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddBook=({ onAddBook}) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
   const [imageUrl, setImageUrl] = useState('')
   const [pdfFile, setPdfFile] = useState('')
   
   const navigate = useNavigate()

   const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/book/add', {name, author, imageUrl, pdfFile})
    .then(res => { 
        if(res.data.added) {
            navigate('/books')
        }
        else {
            console.log(res)
        }

    } )
    .catch(err => console.log(err))
   }


  return (
    <div className="student-form-container">
        <form className='student-form' onSubmit={handleSubmit}>
            <h2>Add Book</h2>
           
            <div className="form-group">
                <label htmlFor="username">Book Name:</label>
                <input type="text" id="book" name="book"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="author">Author Name:</label>
                <input type="text" id="author" name="author"  
                onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" 
                onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="file">Content:</label>
                <input type="file" id="form-control" accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.value)} />
            </div>
            <button type="submit">Add</button>
        </form>
    </div>
  )
}


export default AddBook