import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className='box-layout'>
    <div className='box-layout__box box-layout__box--error'>
      <h1>404!</h1>
      <p>This page does not exist.</p>
      <Link className='button button--secondary' to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFoundPage;