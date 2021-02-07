import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard';
import './global-style.css';

const Render = () => <Dashboard />;

ReactDOM.render(<Render />, document.querySelector('#root'));
