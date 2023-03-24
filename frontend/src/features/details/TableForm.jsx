import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Modal,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleTableNameOnChange,
  handleAddFilterModalOpen,
  handleAddFilterModalClose,
  handleInputChange,
  handleSelectClearChange,
  fetchColumn,
  updateDataById,
  handleDeleteFilter,
  handleCheckBoxInputChange,
  handleOnSubmit,
  handleOnSave,
} from "./DetailPreviewSlice";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotesIcon from "@mui/icons-material/Notes";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";
import FilterModal from "./FilterModal";
import ChooseTable from "../../images/tablechoose.svg";
import dayjs from "dayjs";
import { fetchSavedData } from "./SavedQuerySlice";

function TableForm() {

  const detailPreview = useSelector((state) => state.detailPreview);
  const table_name = detailPreview.table_name;
  const query_data = detailPreview.queryForm.query_data;
  const filters = detailPreview.queryForm.filters;
  const columns = detailPreview.queryForm.columns;
  const queryId = detailPreview.queryId;
//   const fixedColumns =
//     table_name === "Products"
//       ? detailPreview.fixedColumnsProducts
//       : detailPreview.fixedColumnsCustomers;
  const isUpdated = detailPreview.isUpdated;
  const allColumns = detailPreview.allColumns;
  const sorted_by = detailPreview.queryForm.sorted_by;
  const limit = detailPreview.queryForm.limit;
  const addFilterModal = detailPreview.addFilterModal;

  const updatedData = {
    "query_name": query_data,
    "last_queried_on": new Date().toISOString(),
    "request_type": detailPreview.queryForm.limit === "50" ? "Instant Download" : "Bulk Download",
    "query": {"table_name": table_name, "sorted_by": sorted_by, "column": columns, "limit": limit, "filter": filters}
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColumn(table_name));
  }, [dispatch, table_name]);

  return (
    <Box>
      <Box marginBottom={3}>
        <FormControl sx={{ display: "flex" }}>
          <Grid container rowSpacing={0} columnSpacing={4} fontSize="0.9rem">
            <Grid item xs={4}>
              <FormControl sx={{ gap: "0.5rem" }} fullWidth>
                <FormLabel id="query-id">Query Data<Box component='span' color='text.main'>*</Box></FormLabel>
                <TextField
                  aria-labelledby="query-id"
                  required
                  fullWidth
                  id="query-id"
                  value={query_data}
                  placeholder="Untitled Query - 1"
                  onChange={(e) =>
                    dispatch(
                      handleInputChange({
                        key: "query_data",
                        value: e.target.value,
                      })
                    )
                  }
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={3} gap={1}>
              <FormControl sx={{ gap: "0.5rem" }} fullWidth>
                <FormLabel id="select-table">Table Name<Box component='span' color='text.main'>*</Box></FormLabel>
                <Box display="flex" gap="0.5rem">
                  <Select
                    aria-labelledby="select-table"
                    sx={{ color: "#46596A" }}
                    fullWidth
                    size="small"
                    displayEmpty
                    defaultValue=""
                    value={table_name}
                    onChange={(e) =>
                      dispatch(
                        handleTableNameOnChange({ value: e.target.value })
                      )
                    }
                    renderValue={(value) =>
                      value !== "" ? value : "Select Table"
                    }
                    required
                  >
                    <MenuItem sx={{ color: "#46596A" }} value="Customers">
                      Customers{" "}
                    </MenuItem>
                    <MenuItem sx={{ color: "#46596A" }} value="Products">
                      Products{" "}
                    </MenuItem>
                  </Select>
                  <ErrorIcon color="secondary" sx={{ alignSelf: "center" }} />
                </Box>
              </FormControl>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
      {table_name ? (
        <FormControl sx={{ display: "flex" }}>
          <FormControl sx={{ gap: "0.5rem", marginBottom: "2rem" }} fullWidth>
            <FormLabel id="choose-column">
              Choose Columns that you want<Box component='span' color='text.main'>*</Box>
            </FormLabel>
            <Box
              border="1px solid rgba(70, 90, 105, 0.5)"
              borderRadius={1}
              padding={2}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <TextField
                  required
                  id="search-columns"
                  placeholder="Search Column..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <HighlightOffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box display="flex" gap="1rem">
                  <Button
                    sx={{
                      justifyContent: "start",
                      textTransform: "initial",
                      boxShadow: "none",
                      gap: "0.4rem",
                      backgroundColor: "rgba(70, 90, 105, 0.08)",
                      ":hover": {
                        backgroundColor: "rgba(70, 90, 105, 0.08)",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(handleSelectClearChange("select"))}
                  >
                    {" "}
                    <Typography variant="subtitle" color="#46596A">
                      Select All
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      justifyContent: "start",
                      textTransform: "initial",
                      boxShadow: "none",
                      gap: "0.4rem",
                      backgroundColor: "rgba(70, 90, 105, 0.08)",
                      ":hover": {
                        backgroundColor: "rgba(70, 90, 105, 0.08)",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(handleSelectClearChange("cancel"))}
                  >
                    {" "}
                    <Typography variant="subtitle" color="#46596A">
                      Clear All
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <FormGroup>
                <Grid
                  container
                  rowSpacing={0}
                  columnSpacing={1}
                  marginTop={1}
                  padding={1}
                >
                  {allColumns?.map((opt, idx) => {
                    let checked = columns?.includes(opt[0]);
                    return (
                      <Grid
                        item
                        xs={2.4}
                        key={idx}
                        paddingLeft="unset"
                        borderRight={
                          (idx + 1) % 5 === 0 ? "none" : "1px dashed #46596A"
                        }
                      >
                        <FormControlLabel
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0 0",
                            padding: "0 0.5rem",
                          }}
                          key={idx}
                          value={opt[0]}
                          label={
                            <Box
                              display="flex"
                              gap={0.5}
                              color="#46596A"
                              overflow="hidden"
                            >
                              {opt[1] === "character varying" ? (
                                <NotesIcon
                                  sx={{ alignSelf: "center" }}
                                  fontSize="small"
                                />
                              ) : opt[1] === "bigint" ? (
                                <ShowChartIcon
                                  sx={{ alignSelf: "center" }}
                                  fontSize="small"
                                />
                              ) : (
                                <DateRangeIcon
                                  sx={{ alignSelf: "center" }}
                                  fontSize="small"
                                />
                              )}
                              {opt[0].length >= 20
                                ? opt[0].slice(0, 16)
                                : opt[0]}
                            </Box>
                          }
                          control={
                            <Checkbox
                              checked={checked}
                              value={opt[0]}
                              size="small"
                              sx={{
                                "&.Mui-checked": {
                                  color: "#46596A",
                                },
                              }}
                            />
                          }
                          labelPlacement="start"
                          onChange={(events) =>
                            dispatch(
                              handleCheckBoxInputChange({
                                key: "columns",
                                val: events.target.value,
                                checked: !checked,
                              })
                            )
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </FormGroup>
            </Box>
          </FormControl>
          <FormControl sx={{ gap: "0.5rem", marginBottom: "2rem" }} fullWidth>
            <FormLabel id="filter-column">Applied Filters</FormLabel>
            <Box display="flex" gap={3}>
              {filters.length === 0 && (
                <Typography
                  color="text.main"
                  fontSize="0.75rem"
                  alignSelf="center"
                >
                  No Filters Applied
                </Typography>
              )}
              <Button
                sx={{
                  justifyContent: "start",
                  textTransform: "initial",
                  boxShadow: "none",
                  gap: "0.4rem",
                  backgroundColor: "#46596A",
                  "&:hover": { backgroundColor: "#46596A", boxShadow: "none" },
                }}
                variant="contained"
                size="small"
                onClick={() => dispatch(handleAddFilterModalOpen())}
              >
                {" "}
                <AddIcon fontSize="small" />
                <Typography color="white.main">Add Filters</Typography>
              </Button>
              <Modal
                open={addFilterModal}
                onClose={() => dispatch(handleAddFilterModalClose("cancel"))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <FilterModal />
              </Modal>
              {filters.map((addedFilter, idx) => {
                return (
                  <Button
                    sx={{
                      justifyContent: "start",
                      textTransform: "initial",
                      boxShadow: "none",
                      gap: "0.4rem",
                      borderRadius: "8px",
                      backgroundColor: "rgba(70, 90, 105, 0.2)",
                      ":hover": {
                        backgroundColor: "rgba(70, 90, 105, 0.2)",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    size="small"
                  >
                    {" "}
                    <Typography variant="subtitle" color="#46596A">
                      <Box display="flex" gap={1}>
                        {addedFilter.type === "string" ? (
                          <NotesIcon
                            sx={{ alignSelf: "center" }}
                            fontSize="small"
                          />
                        ) : addedFilter.type === "int" ? (
                          <ShowChartIcon
                            sx={{ alignSelf: "center" }}
                            fontSize="small"
                          />
                        ) : (
                          <DateRangeIcon
                            sx={{ alignSelf: "center" }}
                            fontSize="small"
                          />
                        )}
                        {addedFilter.column.toUpperCase()}
                        <CloseIcon
                          onClick={() =>
                            dispatch(handleDeleteFilter(addedFilter.column))
                          }
                          sx={{ alignSelf: "center" }}
                          fontSize="small"
                        />
                      </Box>
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </FormControl>
          <FormControl sx={{ gap: "0.5rem", marginBottom: "2rem" }} fullWidth>
            <FormLabel id="sorted-column">Data Sorted By<Box component='span' color='text.main'>*</Box></FormLabel>
            <Box display="flex" gap={3}>
              <FormControl>
                <Select
                  aria-labelledby="select-column"
                  sx={{ color: "#46596A" }}
                  size="small"
                  displayEmpty
                  value={sorted_by[0]}
                  onChange={(e) =>
                    dispatch(
                      handleInputChange({
                        key: "sorted_by",
                        value: [e.target.value, sorted_by[1]],
                      })
                    )
                  }
                  renderValue={(value) =>
                    value !== "" ? value.toUpperCase() : "Select Column"
                  }
                  required
                >
                  {columns.map((val, idx) => {
                    return (
                      <MenuItem sx={{ color: "#46596A" }} value={val}>
                        {val.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  aria-labelledby="select-asc-desc"
                  sx={{ color: "#46596A" }}
                  size="small"
                  displayEmpty
                  value={sorted_by[1]}
                  renderValue={(value) =>
                    value !== "" ? value.toUpperCase() : "Select Option"
                  }
                  onChange={(e) =>
                    dispatch(
                      handleInputChange({
                        key: "sorted_by",
                        value: [sorted_by[0], e.target.value],
                      })
                    )
                  }
                  required
                >
                  <MenuItem sx={{ color: "#46596A" }} value="asc">
                    ASC
                  </MenuItem>
                  <MenuItem sx={{ color: "#46596A" }} value="desc">
                    DESC
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </FormControl>
          <FormControl sx={{ gap: "0.5rem", marginBottom: "2rem" }} fullWidth>
            <FormLabel id="sorted-column">Output Format<Box component='span' color='text.main'>*</Box></FormLabel>
            <Box display="flex" gap={3}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="radio-buttons-records"
                  defaultValue="50"
                  value={limit}
                  onChange={(e) =>
                    dispatch(
                      handleInputChange({ key: "limit", value: e.target.value })
                    )
                  }
                  name="radio-buttons-records"
                >
                  <FormControlLabel
                    value="50"
                    fontSize="0.75rem"
                    label="50 records in CSV"
                    sx={{ color: "#46596A" }}
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="0"
                    fontSize="0.75rem"
                    label="Full Data Dump in CSV"
                    sx={{ color: "#46596A" }}
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </FormControl>
          <FormControl
            sx={{
              gap: "0.5rem",
              backgroundColor: "rgba(70, 90, 105, 0.08)",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
            fullWidth
          >
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
                onClick={() => {
                  dispatch(handleOnSubmit());
                }}
              >
                <Typography color="white.main">Download Data</Typography>
              </Button>
              { isUpdated ? 
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
                onClick={() => { 
                    dispatch(updateDataById({id : queryId, bodyData: updatedData}));
                }}
              >
                <Typography color="text.main">Update Query</Typography>
              </Button> :
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
                onClick={() => dispatch(handleOnSave())}
              >
                <Typography color="text.main">Save Query</Typography>
              </Button>
              }
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
                onClick={() => dispatch(handleTableNameOnChange({ value: "" }))}
              >
                <Typography color="text.main">Cancel</Typography>
              </Button>
            </Box>
          </FormControl>
        </FormControl>
      ) : (
        <Box display="flex" minHeight="60vh" alignItems="center">
          <Box
            component="img"
            width="210px"
            height="208px"
            margin="auto"
            src={ChooseTable}
            alt="Choose Table"
          />
        </Box>
      )}
    </Box>
  );
}

export default TableForm;
