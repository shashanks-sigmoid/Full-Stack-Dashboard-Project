import { Modal } from "@mui/material";
import { fetchData } from "../LoadDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ConfirmDownload from "./ConfirmDownload";
import { handleAddDownloadModelClose } from "./../DetailPreviewSlice";
const Download = () => {
  const detailPreview = useSelector((state) => state.detailPreview);
  const dispatch = useDispatch();
  let bodyData = {
    table_name: detailPreview.table_name,
    sorted_by: detailPreview.queryForm.sorted_by,
    limit: detailPreview.queryForm.limit,
    column: detailPreview.queryForm.columns,
    filter: detailPreview.queryForm.filters,
    download: detailPreview.download,
  };
  useEffect(() => {
    // console.log("useeffect", bodyData.column);
    dispatch(fetchData(bodyData));
  }, [detailPreview.downloadToggle]);
  return (
    <Modal
      open={detailPreview.download == "true"}
      onClose={() => dispatch(handleAddDownloadModelClose())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ConfirmDownload />
    </Modal>
  );
};

export default Download;
