import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const Logout = ({ setRole }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/auth/logout`)
      .then((res) => {
        if (res.data.logout) {
          localStorage.removeItem("token");

          setRole("");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
};

export default Logout;