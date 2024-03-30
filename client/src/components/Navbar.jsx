import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = ({role}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <a className="navbar-brand" ><Link to="/"> NS BookStore</Link></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item"><a className="nav-link" ><Link to="/books" className='navbar-link'>Books</Link></a></li>
                        {role === "admin" && <> 
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" ><Link to="/addbook" className='navbar-link'>Add Book</Link></a></li>
                        <li className="nav-item"><a className="nav-link active" ><Link to="/addstudent" className='navbar-link'>Add Student</Link></a></li>
                        <li className="nav-item"><a className="nav-link active" ><Link to="/dashboard" className='navbar-link'>Dashboard</Link></a></li>
                        </ul>
                        </>}
                        {role === "" ? <li className="nav-item active"><a className="nav-link" ><Link to="/login" className='navbar-link'>Login</Link></a></li> :  
                          <li className="nav-item active"><a className="nav-link" ><Link to="/logout" className='navbar-link'>Logout</Link></a></li>
                        }
     
      </ul>
    </div>
  </div>
</nav>
  )}





  

export default Navbar