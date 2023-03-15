import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1146,
    height: 556,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function FilterModal() {
    return (
        <Box sx={style}>
            <Box display='flex' justifyContent='space-between'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Apply Filters
                </Typography>
                <CloseIcon />

            </Box>
            <Box margin='1rem 0'>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', gap: '0.4rem', backgroundColor: '#46596A' }}
                    variant='contained'
                    size='small'
                > <AddIcon fontSize='small' />
                    <Typography color='white.main'>
                        Add New Row
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default FilterModal