import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { handleAddDownloadModelClose } from "./../DetailPreviewSlice";

import data from "./../../../output/filtered_data.csv";

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

function ConfirmDownload() {
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
      <Typography fontSize="20px">Confirm Downloading....</Typography>
      <Box display="flex" gap={3} flexDirection="row-reverse">
        <Button
          href={data}
          download="filtered_data.csv"
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
          onClick={() => dispatch(handleAddDownloadModelClose())}
        >
          <Typography color="white.main"> Confirm Download</Typography>
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
          onClick={() => dispatch(handleAddDownloadModelClose())}
        >
          <Typography color="text.main">Cancel</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmDownload;
