import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LoadData from "./LoadData/LoadData";
import TableForm from "./TableForm";
import { useSelector, useDispatch } from "react-redux";
import { handleDetail, handlePreview } from "./DetailPreviewSlice";
import Preview from "./Preview";
import Download from "./DownLoad/Download";
import Save from "./Save/Save";

function DetailPreview() {
  const detailPreview = useSelector((state) => state.detailPreview);
  const details = detailPreview.details;
  const load = detailPreview.load;
  const dispatch = useDispatch();

  return (
    <Box display="flex" flexDirection="column" minHeight="90vh" gap="1.5rem">
      <Box display="flex" gap="1rem">
        <Button
          sx={{ justifyContent: "start", textTransform: "initial" }}
          variant="text"
          color={details === true ? "text" : "white"}
          onClick={() => dispatch(handleDetail())}
        >
          {" "}
          <Typography color={details === true ? "text" : "secondary"}>
            Details
          </Typography>
        </Button>
        <Button
          sx={{ justifyContent: "start", textTransform: "initial" }}
          variant="text"
          color={details === true ? "white" : "text"}
          onClick={() => dispatch(handlePreview())}
        >
          {" "}
          <Typography color={details === true ? "secondary" : "text"}>
            Preview
          </Typography>
        </Button>
      </Box>
      {details ? <TableForm /> : load ? <LoadData /> : <Preview />}
      {detailPreview.download === "true" ? <Download /> : null}
      {detailPreview.save ? <Save /> : null}
    </Box>
  );
}

export default DetailPreview;
