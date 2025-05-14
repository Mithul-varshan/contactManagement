import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home_user from '../pages/user/Home_user';
import MiniDrawer from '../components/navbar/Navbar';


function Applayout() {
  return (
    <Box sx={{ display: 'flex',height: '100vh'}}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p:3
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/user/" element={<Home_user />} />
          <Route path="/user/take_action" />
        </Routes>
      </Box>
    </Box>
  );
}

export default Applayout;
