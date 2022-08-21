import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux';

import './App.css';

import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import LoginRoute from "./loginRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
