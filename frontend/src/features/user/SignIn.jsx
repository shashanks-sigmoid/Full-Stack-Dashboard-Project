import { Box, Button, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
     handleUserInputChange,
     handleClearInput,
     handleLoginSubmit
} from './SignInSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReckittLogo from '../../images/logo.svg';
import QueryBuilder from '../../images/querybuilder.png';


function SignIn() {

    const signIn = useSelector((state) => state.signIn);
    const loggedIn = signIn.loggedIn;
    const user = signIn.user;
    const email = user.email;
    const password = user.password;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(()=>{
        if(loggedIn!=="null") navigate('/dashboard');     
    },[loggedIn, navigate])


    return (
        <Box padding={2}>
            <Box margin={2} width='80px' height='42px' component='img' src={ReckittLogo} alt="ReckittLogo" />
            <Grid
            container
            rowSpacing={0}
            height='100%'
            margin={4}
            width='unset'
          >
            <Grid height='100%' item xs={6} padding='5rem'>
                <Box display='flex' textAlign='center' flexDirection='column' height='26rem' alignItems='center'>
                    <Box component='img' width='210px' height='250px' margin='auto' src={QueryBuilder} alt="Choose Table" />
                    <Typography padding={2} fontSize='18px' color='rgba(70, 89, 106, 1)' >Access Data from the Google Sheets using REST APIs. Further connect these APIs to your Business Report, Databricks Notebooks and much more. Find out more by logging in.</Typography>
                </Box>
                
            </Grid>
            <Grid height='100%' item xs={6} padding='5rem'>
                <Box display='flex' borderRadius='5px' boxShadow='0px 0px 30px 0px rgba(0, 0, 0, 0.25)' flexDirection='column' justifyContent='space-between' bgcolor='text.main' textAlign='start' height='26rem' padding='1.5rem 2rem'>
                    <Box>
                        <Typography variant='h5' color='white.main'>Hi,</Typography>
                        <Typography variant='h5' color='white.main'>Welcome back to Query Builder Portal</Typography>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' component='form' flexDirection='column' gap={2} onSubmit={(e)=>{
                            e.preventDefault();
                            dispatch(handleLoginSubmit(user));
                            }} >
                           
                            <TextField
                                required
                                type="email"
                                id="user-email"
                                placeholder='Email'
                                fullWidth
                                size="small"
                                value={email}
                                onChange={(e) =>
                                        dispatch(handleUserInputChange({ key: "email", value: e.target.value }))
                                    }
                                sx={{backgroundColor:'white.main', borderRadius:'5px'}}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'><HighlightOffIcon onClick={(e)=>dispatch(handleClearInput("email"))} /></InputAdornment>
                                }}
                                />
                                
                            <TextField
                                required
                                type="password"
                                id="user-password"
                                placeholder='Password'
                                fullWidth
                                size="small"
                                value={password}
                                onChange={(e) =>
                                        dispatch(handleUserInputChange({ key: "password", value: e.target.value }))
                                    }
                                sx={{backgroundColor:'white.main', borderRadius:'5px'}}
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'><HighlightOffIcon onClick={(e)=>dispatch(handleClearInput("password"))} /></InputAdornment>
                                }}
                                />
                               
                            <Button
                                type='submit'
                                sx={{ textTransform: 'initial', boxShadow: 'none', ":hover": { boxShadow: 'none' } }}
                                fullWidth
                                variant='contained'
                                color="white"
                            > 
                                <Typography variant='h6' color='text.main'>
                                    Sign In
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
  )
}

export default SignIn
