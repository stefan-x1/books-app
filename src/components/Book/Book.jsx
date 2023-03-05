import React from 'react';

import './Book.css';

const Book = ({ author, title, genre }) => {
  return (
    <div className='book'>
      <h3 className='book__title'>{title}</h3>
      <p className='book__author'>{author}</p>
      <p className='book__genre'>{genre}</p>
    </div>
  )
}

export default Book