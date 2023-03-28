import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import LoadingWait from "./LoadingWait";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchData } from "./../LoadDataSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LoadData = () => {
  const loadData = useSelector((state) => state.loadData);
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
    dispatch(fetchData(bodyData));
  }, [dispatch]);

  return (
    <Box
      minHeight="90vh"
      display="flex"
      //   justifyContent="center"
      //   alignItems="center"
      flexDirection="column"
    >
      {loadData.size ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {loadData.column.map((col, idx) => {
                  return (
                    <StyledTableCell align="center" key="idx">
                      {col}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log("new_data", loadData.data)} */}
              {loadData.data.map((row, i) => {
                return (
                  <StyledTableRow key={i}>
                    {row.map((val, idx) => {
                      return (
                        <StyledTableCell align="center" key={idx}>
                          {val}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LoadingWait />
      )}
    </Box>
  );
};

export default LoadData;
