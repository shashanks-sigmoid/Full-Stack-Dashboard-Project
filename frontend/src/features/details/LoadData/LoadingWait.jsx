import React from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

function LoadingWait() {
    return (
        <Box
            minHeight="90vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <CircularProgress color="text" />
            <Typography color="secondary">
                Please wait while we load data for preview...
            </Typography>
        </Box>
    );
}
export default LoadingWait;