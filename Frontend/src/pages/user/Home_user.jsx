import React from 'react'
import {Box,Modal,Typography} from "@mui/material"
import SpeedDialTooltipOpen from '../../components/speeddial/Speed_Dial'
function Home_user() {
  return (
    <Box  sx={{ height: 'fit-content' }}>
         <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: (theme) => theme.zIndex.tooltip, }}>
        <SpeedDialTooltipOpen />
      </Box>
    </Box>
  )
}

export default Home_user