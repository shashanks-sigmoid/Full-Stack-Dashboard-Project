import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleAddSaveModelClose } from "./../DetailPreviewSlice";
import SaveSuccessful from "./SaveSuccessful";
import { saveData } from "./../LoadDataSlice";
const Download = () => {
  const detailPreview = useSelector((state) => state.detailPreview);
  const dispatch = useDispatch();
  let bodyData = {
    query_name: detailPreview.queryForm.query_data,
    created_on: "2022-12-03",
    last_queried_on: "2023-03-03",
    request_type:
      detailPreview.queryForm.limit === "50"
        ? "Instant Download"
        : "Bulk Download",
    query: {
      table_name: detailPreview.table_name,
      sorted_by: detailPreview.queryForm.sorted_by,
      limit: detailPreview.queryForm.limit,
      column: detailPreview.queryForm.columns,
      filter: detailPreview.queryForm.filters,
    },
  };
  useEffect(() => {
    dispatch(saveData(bodyData));
  }, [detailPreview.saveToggle]);
  return (
    <Modal
      open={detailPreview.save}
      onClose={() => dispatch(handleAddSaveModelClose())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SaveSuccessful />
    </Modal>
  );
};

export default Download;
