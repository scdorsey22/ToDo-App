import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import Login from './pages/Login'
import Home from './pages/Home';
import Signup from './pages/Signup';

const theme = createTheme()

function App() {

  return (
    
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
      </BrowserRouter>
      </div>
    </ThemeProvider>

  );
}
export default App;
