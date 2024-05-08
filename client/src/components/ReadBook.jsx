import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axiosInstance from "../utils/AxiosInstance";

function ReadBook() {
  const location = useLocation();
  const { id } = location.state;
  const [pdf, setPDF] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/book/pdf/${id}`)
      .then((res) => {
        setLoading(false);
        setPDF(res.data.pdfFile);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return loading === true ? (
    <div style={{ minHeight: "80vh", minWidth: "100vw", display: "flex" }}>
      <Spinner className="m-auto" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div>
      <object data={pdf} type="application/pdf" width="100%" height="900px">
        <p>Sorry, your browser doesn't support embedded PDFs.</p>
      </object>
    </div>
  );
}

export default ReadBook;
