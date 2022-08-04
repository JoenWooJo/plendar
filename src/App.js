import React from 'react';
import { useRoutes } from 'react-router';
import Main from './component/Main';

const App= () => (
  useRoutes([
    {path: '/', element: <Main />}
  ])
);

export default App;
