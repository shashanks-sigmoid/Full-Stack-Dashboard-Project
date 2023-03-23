import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PreviewImage from "../../images/preview.jpeg";
import { handleLoad } from "./DetailPreviewSlice";
import { useDispatch } from "react-redux";

function Preview() {
  const dispatch = useDispatch();
  return (
    <Box
      minHeight="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        component="img"
        width="281px"
        height="361px"
        src={PreviewImage}
        alt="Choose Table"
      />
      <Button
        onClick={() => dispatch(handleLoad())}
        sx={{
          justifyContent: "start",
          textTransform: "initial",
          boxShadow: "none",
          gap: "0.4rem",
          backgroundColor: "text.main",
          "&:hover": { backgroundColor: "text.main", boxShadow: "none" },
        }}
        variant="contained"
      >
        <Typography color="white.main">Load Data</Typography>
      </Button>
    </Box>
  );
}

export default Preview;
