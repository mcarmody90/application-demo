import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <h1>404!<br /><Link className='button' to="/">Go Home</Link></h1>
    </div>
  </div>
);

export default NotFoundPage;