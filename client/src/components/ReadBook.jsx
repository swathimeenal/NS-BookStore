import React from 'react'
import { useLocation } from 'react-router-dom'

function ReadBook( ) {
  const location = useLocation();
  const {book} = location.state;
  return (
   <div>
   <iframe src =  {`../uploads/${book}`} 
   width="600" height="800">

    </iframe>
   </div>
  )
}

export default ReadBook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              