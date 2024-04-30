import React,{ useState  }from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const AddBook=({ }) => {
   const [name, setName] = useState('')
   const [author, setAuthor] = useState('')
   const [imageUrl, setImageUrl] = useState('')
   const [pdfFile, setPdfFile] = useState([ ]);
   
   const navigate = useNavigate();

   // upload api
   const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData =  new FormData();
    formData.append('name',name);
    formData.append('author',author);
    formData.append('image',imageUrl);
    formData.append("file",pdfFile);
    console.log(formData);
    const res = await axios.post('http://localhost:3001/book/add',formData,
    {
        headers:{"Content-Type": "multipart/form-data"},
    })
    console.log(res)
    .then(res => { 
        if(res.status === 400) {
           toast.error("Please upload a file")  
        }
        toast.success(res.data.message);
       setTimeout(()=>{
           navigate('/books')
        },1000);
    })
    .catch(()=>{
        toast.error("Can't Upload");
   })
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
                <input type="file" id="form-control" accept="application/pdf" required
                onChange={(e) => setPdfFile(e.target.files[0])} />
            </div>
            <button type="submit">Add</button>
            
        </form>
        <ToastContainer />
    </div>
  )
}


export default AddBook