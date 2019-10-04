import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard';
import './global-style.css';

const Render = () => {
  return <Dashboard />;
};

ReactDOM.render(<Render />, document.querySelector('#root'));
