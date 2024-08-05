// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import Form from './routes/Form';
import Chat from './routes/Chat';
import Result from './routes/Result';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/form' element={<Form />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
