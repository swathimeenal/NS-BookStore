import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [pdfFile, setPdfFile] = useState([ ])
    
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get('http://localhost:3001/book/book/'+id)
        .then(res => { 
            setName(res.data.name)
            setAuthor(res.data.author)
            setImageUrl(res.data.imageUrl)
            setPdfFile(res.data.pdfFile)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/book/book/'+id, {name, author, imageUrl, pdfFile})
        .then(res => { 
            if(res.data.updated) {
                navigate('/books')
            }
            else {
              toast.error("error")
            }
        })
        .catch(err =>toast.error("Can't get Updated"))
      }

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input type="text" id="book" name="book"  value={name}
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input type="text" id="author" name="author" value ={author}
          onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}/>
        </div>
        <div className="form-group">
             <label htmlFor="file">Content:</label>
             <input type="file" id="form-control" accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])} />
            </div>
        <button type="submit">Update </button>
      </form>
    </div>
  )
}

export default EditBook
