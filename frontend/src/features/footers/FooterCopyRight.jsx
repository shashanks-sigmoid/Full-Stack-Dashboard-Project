import { Typography, Box } from '@mui/material'
import React from 'react'

function FooterCopyRight() {
    return (
        <Box bgcolor='#46596A' display='flex' bottom={0} width='100%'>
            <Typography variant='subtitle2' alignSelf='center' color='white.main' margin='auto'>Copyright &copy;2022. Powered by RBOne</Typography>
        </Box>
    )
}

export default FooterCopyRight