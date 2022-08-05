import React from 'react';
import { useRoutes } from 'react-router';
import Main from './pages/Main';


const Applog= () => (
  useRoutes([
    {path: '/', element: < Main/>},

  ])
);

export default Applog;
