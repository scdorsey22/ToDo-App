import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home';

function App() {
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>} /> */}
          <Route path='/' element={<Login/>} />
        </Routes>
    </BrowserRouter>
    </div>

  );
}
export default App;
