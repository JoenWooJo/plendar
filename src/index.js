import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import Applog from './Applog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Applog />
    </Router>
);