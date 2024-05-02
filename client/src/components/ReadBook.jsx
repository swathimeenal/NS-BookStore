import React from 'react'
import { useLocation } from 'react-router-dom'

function ReadBook( ) {
  const location = useLocation();
  const {book} = location.state;
  return (
    <div>
      <object data={book} type="application/pdf" width="100%" height="900px">
        <p>Sorry, your browser doesn't support embedded PDFs.</p>
      </object>
    </div>
  )
}

export default ReadBook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              