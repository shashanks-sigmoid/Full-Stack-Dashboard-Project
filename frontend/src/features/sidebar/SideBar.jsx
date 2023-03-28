import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { handleToggleQueryData, handleToggleSavedQuery } from './SideBarSlice';
// import {handleTableNameOnChange} from '../details/DetailPreviewSlice';
import { Box, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';



function SideBar() {

    const sideBar = useSelector(state => state.sideBar);
    const toggle = sideBar.toggle;
    const dispatch = useDispatch();

    return (
        <Box display='flex' flexDirection='column' gap='1rem'>
            <Box display='flex' gap='0.5rem' padding='0 0.5rem' color='secondary'>
                <MenuIcon color='secondary' sx={{ cursor: 'pointer' }} />
                <Typography color='secondary'>Menu</Typography>
            </Box>
            <Box display='flex' flexDirection='column' gap='1rem'>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', ":hover": { boxShadow: 'none' } }}
                    fullWidth
                    variant='contained'
                    startIcon={<LibraryAddIcon color={toggle ? 'text' : 'white'} />}
                    color={toggle ? 'btnColor' : 'text'}
                    onClick={() =>{
                        dispatch(handleToggleQueryData())}}
                        // dispatch(handleTableNameOnChange(""))}}
                > <Typography color={toggle ? 'text.main' : 'white.main'}>
                        Query Data
                    </Typography>
                </Button>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', ":hover": { boxShadow: 'none' } }}
                    fullWidth
                    variant='contained'
                    startIcon={<LibraryBooksIcon color={toggle ? 'secondary' : 'text'} />}
                    color={toggle ? "white" : 'btnColor'}
                    onClick={() =>
                        {dispatch(handleToggleSavedQuery())}}
                        // dispatch(handleTableNameOnChange(""))}}
                > <Typography color={toggle ? 'secondary' : 'text.main'}>
                        Saved Queries
                    </Typography></Button>
            </Box>
        </Box>
    );
}
export default SideBar;