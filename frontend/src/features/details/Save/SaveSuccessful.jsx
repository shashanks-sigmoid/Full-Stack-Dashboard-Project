import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  handleAddSaveModelClose,
  handleClearQuery,
} from "./../DetailPreviewSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

function SaveSuccessful() {
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={3}
      sx={style}
    >
      <Typography fontSize="20px">Saved successfully !!!</Typography>
      <Box display="flex" gap={3} flexDirection="row-reverse">
        <Button
          sx={{
            justifyContent: "start",
            textTransform: "initial",
            boxShadow: "none",
            gap: "0.4rem",
            backgroundColor: "text.main",
            "&:hover": {
              backgroundColor: "text.main",
              boxShadow: "none",
            },
          }}
          variant="contained"
          onClick={() => dispatch(handleClearQuery())}
        >
          <Typography color="white.main"> Clear Query</Typography>
        </Button>
        <Button
          sx={{
            justifyContent: "start",
            textTransform: "initial",
            boxShadow: "none",
            border: "1px solid #FF0081",
            gap: "0.4rem",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "1px solid #FF0081",
            },
          }}
          variant="outlined"
          onClick={() => dispatch(handleAddSaveModelClose())}
        >
          <Typography color="text.main">Cancel</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default SaveSuccessful;
