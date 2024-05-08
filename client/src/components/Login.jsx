import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
import axiosInstance, { updateToken } from "../utils/AxiosInstance";

const Login = ({ setRoleVar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(`admin`);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    // axios
    //   .post(`https://ns-bookstore.onrender.com/auth/login`, { username, password, role })

    axiosInstance
      .post("/auth/login", { username, password, role })
      .then((res) => {
        console.log(res.data);

        updateToken(res.data.token);

        if (res.data.login && res.data.role === "admin") {
          setRoleVar("admin");
          navigate("/dashboard");
        } else if (res.data.login && res.data.role === "student") {
          setRoleVar("student");
          navigate("/");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>LogIn</h2> <br />
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            placeholder="Enter UserName"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn-login" onClick={handleSubmit}>
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
