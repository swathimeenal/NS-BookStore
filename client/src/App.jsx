import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Books from "./components/Books.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddStudent from "./components/AddStudent.jsx";
import AddBook from "./components/AddBook.jsx";
import EditBook from "./components/EditBook.jsx";
import DeleteBook from "./components/DeleteBook.jsx";
import ReadBook from "./components/ReadBook.jsx";
import axios from "axios";
import axiosInstance from "./utils/AxiosInstance.jsx";

function App() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    // axios.get('https://ns-bookstore.onrender.com/auth/verify')

    axiosInstance
      .get("/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRoleVar={setRole} />} />
        <Route path="/books" element={<Books role={role} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/book/:id" element={<EditBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
        <Route path="/readbook" element={<ReadBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
