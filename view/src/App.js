import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import login from './pages/login'


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/login' element={login} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
