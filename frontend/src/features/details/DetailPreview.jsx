import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import TableForm from './TableForm';


function DetailPreview() {


    return (
        <Box display='flex' flexDirection='column' minHeight='90vh' gap='1.5rem'>
            <Box display='flex' gap='1rem'>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial' }}
                    variant='text'
                    color='text'
                > <Typography color='text'>
                        Details
                    </Typography></Button>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial' }}
                    variant='text'
                    color="white"
                > <Typography color='secondary'>
                        Preview
                    </Typography></Button>
            </Box>
            <TableForm />
        </Box>
    )
}

export default DetailPreview
