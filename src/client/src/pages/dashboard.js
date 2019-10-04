import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import io from 'socket.io-client';

// Define a style component to render later
const Content = styled('div')`
  height: 20px;
  width: 100%;
`;

// Connect to socket server
const socket = io(`${process.env.SERVER_URL}:${process.env.PORT}`);

const Render = () => {
  // State hooks
  const [apiCall, setApiCall] = useState('');
  const [socketTime, setSocketTime] = useState('');
  const [status, setStatus] = useState('');

  // Socket connection
  socket.on('time', data => setSocketTime(data));
  socket.on('joined', data => setStatus(data));
  socket.on('connect', function() {
    socket.emit('join', { id: 'mail@mail.com' });
  });

  // Axios API call
  const getStatus = () => {
    axios
      .get(`/api/example/test`)
      .then(result => {
        setApiCall(result.data.message);
      })
      .catch(console.log);
  };

  // Life-cycle hook
  useEffect(() => {
    // Call API
    getStatus();
  });

  return (
    <>
      <Content>{apiCall}</Content>
      <Content>{socketTime}</Content>
      <Content>{status}</Content>
    </>
  );
};

export default Render;
