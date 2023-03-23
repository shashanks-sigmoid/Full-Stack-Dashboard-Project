import { Box, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DetailPreview from '../details/DetailPreview'
import SavedQueries from '../details/SavedQueries'
import FooterCopyRight from '../footers/FooterCopyRight'
import SideBar from '../sidebar/SideBar'
import ResponsiveAppBar from './ResponsiveAppBar'

function Dashboard() {

  const sideBar = useSelector(state => state.sideBar);
  const signIn = useSelector(state => state.signIn);
  const loggedIn = signIn.loggedIn;
  const toggle = sideBar.toggle;

  

  if(loggedIn!=="null"){
  return (

         <Box>
          <Grid
            container
            rowSpacing={0}
            height='100%'
          >
            <Grid item xs={12} md={12} borderBottom='1px solid gray'>
              <ResponsiveAppBar />
            </Grid>
            <Grid height='100%' item xs={2} md={2} padding='1rem'>
              <SideBar />
            </Grid>
            <Grid display='flex' flexDirection='column' height='100%' item xs={10} md={10} borderLeft='1px solid gray' padding='1rem 1rem 0 1rem'>
              {toggle ? <DetailPreview /> : <SavedQueries />}
            </Grid>
            <Grid item xs={12} md={12}>
              <FooterCopyRight />
            </Grid>
          </Grid>
        </Box> 
    )
  }
  else{
    return <Navigate replace to='/'/>;
  }
}

export default Dashboard
