import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import Login from './pages/Login'
import Home from './pages/Home';

const theme = createTheme()

function App() {

  return (
    
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<Home/>} />
            <Route exact path='/' element={<Login/>} />
          </Routes>
      </BrowserRouter>
      </div>
    </ThemeProvider>

  );
}
export default App;
