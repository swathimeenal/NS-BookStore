import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    //   axios.delete('https://ns-bookstore.onrender.com/book/book/'+id)
    axiosInstance
      .delete("/book/book/" + id)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/books");
        }
      })
      .catch((err) => console.log(err));
  }, []);
};

export default DeleteBook;
