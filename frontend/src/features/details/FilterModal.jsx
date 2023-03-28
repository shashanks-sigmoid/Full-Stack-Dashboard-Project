import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleAddFilterModalClose,
  handleFilterColumns,
  handleDeleteFilter,
  handleFilterTypeInputChange,
} from "./DetailPreviewSlice";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotesIcon from "@mui/icons-material/Notes";
import DateRangeIcon from "@mui/icons-material/DateRange";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1246,
  height: 556,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

function FilterModal() {
  const detailPreview = useSelector((state) => state.detailPreview);
  const table_name = detailPreview.table_name;
  const filters = detailPreview.queryForm["filters"];
  const fixedColumns =
    table_name === "Products"
      ? detailPreview.fixedColumnsProducts
      : detailPreview.fixedColumnsCustomers;
  const [addFilter, setAddFilter] = React.useState(false);
  const [addFilterColumn, setAddFilterColumn] = React.useState("");
  const handleAddFilterOpen = () => setAddFilter(true);
  const handleAddFilterClose = () => setAddFilter(false);

  const dispatch = useDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3} sx={style}>
      <Box display="flex" justifyContent="space-between">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Apply Filters
        </Typography>
        <CloseIcon
          sx={{ cursor: "pointer" }}
          onClick={() => dispatch(handleAddFilterModalClose("cancel"))}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          sx={{
            width: "15%",
            justifyContent: "center",
            textTransform: "initial",
            boxShadow: "none",
            gap: "0.4rem",
            backgroundColor: "#46596A",
            "&:hover": { backgroundColor: "#46596A", boxShadow: "none" },
          }}
          variant="contained"
          size="small"
          onClick={handleAddFilterOpen}
        >
          {" "}
          <AddIcon fontSize="small" />
          <Typography color="white.main">Add New Row</Typography>
        </Button>
        {addFilter && (
          <FormControl sx={{ width: "25%", flexDirection: "row", gap: "1rem" }}>
            <Select
              aria-labelledby="select-column"
              sx={{ width: "80%", color: "#46596A" }}
              size="small"
              displayEmpty
              defaultValue=""
              value={addFilterColumn}
              onChange={(e, key) => {
                dispatch(
                  handleFilterColumns({ value: e.target.value, key: key.key })
                );
                handleAddFilterClose();
                setAddFilter(false);
                setAddFilterColumn("");
              }}
              renderValue={(value) => (value !== "" ? value : "Select Column")}
              required
            >
              {Object.entries(fixedColumns).map(([key, value]) => {
                return (
                  <MenuItem key={value} sx={{ color: "#46596A" }} value={key}>
                    {key.toUpperCase()}{" "}
                  </MenuItem>
                );
              })}
            </Select>
            <DeleteOutlineIcon
              onClick={handleAddFilterClose}
              sx={{ alignSelf: "center", cursor: "pointer" }}
              fontSize="small"
              color="#46596A"
            />
          </FormControl>
        )}
        {filters.map((val, idx) => {
          const columnType = val.type;
          const filterType = val.filter_type;
          const inputText = val.value;
          const dateRange = val.dateRange;
          switch (columnType) {
            case "string":
              return (
                <FormControl
                  sx={{ width: "50%", flexDirection: "row", gap: "1rem" }}
                >
                  <NotesIcon sx={{ alignSelf: "center" }} fontSize="small" />
                  <Typography
                    border="1px solid rgba(70, 90, 105, 0.4)"
                    borderRadius={1}
                    padding="0.5rem"
                    alignSelf="center"
                    color="#46596A"
                  >
                    {val.column.toUpperCase()}
                  </Typography>
                  <Select
                    aria-labelledby="select-range"
                    sx={{ width: "80%", color: "#46596A" }}
                    size="small"
                    displayEmpty
                    value={filterType}
                    onChange={(e) =>
                      dispatch(
                        handleFilterTypeInputChange({
                          column: val.column,
                          value: e.target.value,
                          key: "filterType",
                        })
                      )
                    }
                    renderValue={(value) =>
                      value !== "" ? value : "Select Column"
                    }
                    required
                  >
                    <MenuItem sx={{ color: "#46596A" }} value="Starts With">
                      Starts With{" "}
                    </MenuItem>
                    <MenuItem sx={{ color: "#46596A" }} value="Contains">
                      Contains{" "}
                    </MenuItem>
                    <MenuItem sx={{ color: "#46596A" }} value="Ends With">
                      Ends With{" "}
                    </MenuItem>
                  </Select>
                  <TextField
                    required
                    fullWidth
                    value={inputText}
                    onChange={(e) =>
                      dispatch(
                        handleFilterTypeInputChange({
                          column: val.column,
                          value: e.target.value,
                          key: "inputText",
                        })
                      )
                    }
                    placeholder="Type word or sentences.."
                    size="small"
                  />
                  <DeleteOutlineIcon
                    onClick={() => dispatch(handleDeleteFilter(val.column))}
                    sx={{ alignSelf: "center", cursor: "pointer" }}
                    fontSize="small"
                    color="#46596A"
                  />
                </FormControl>
              );
            case "int":
              return (
                <FormControl
                  sx={{ width: "45%", flexDirection: "row", gap: "1rem" }}
                >
                  <ShowChartIcon
                    sx={{ alignSelf: "center" }}
                    fontSize="small"
                  />
                  <Typography
                    border="1px solid rgba(70, 90, 105, 0.4)"
                    borderRadius={1}
                    padding="0.5rem"
                    alignSelf="center"
                    color="#46596A"
                  >
                    {val.column.toUpperCase()}
                  </Typography>
                  <Select
                    aria-labelledby="select-range"
                    sx={{ width: "80%", color: "#46596A" }}
                    size="small"
                    displayEmpty
                    value={filterType}
                    onChange={(e) =>
                      dispatch(
                        handleFilterTypeInputChange({
                          column: val.column,
                          value: e.target.value,
                          key: "filterType",
                        })
                      )
                    }
                    renderValue={(value) =>
                      value !== "" ? value : "Select Column"
                    }
                    required
                  >
                    <MenuItem sx={{ color: "#46596A" }} value="Less Than">
                      Less Than{" "}
                    </MenuItem>
                    <MenuItem sx={{ color: "#46596A" }} value="Equal to">
                      Equal to{" "}
                    </MenuItem>
                    <MenuItem sx={{ color: "#46596A" }} value="More Than">
                      More Than{" "}
                    </MenuItem>
                  </Select>
                  <TextField
                    type="number"
                    required
                    id={val.value}
                    value={inputText}
                    onChange={(e) =>
                      dispatch(
                        handleFilterTypeInputChange({
                          column: val.column,
                          value: e.target.value,
                          key: "inputText",
                        })
                      )
                    }
                    placeholder="Type number.."
                    size="small"
                  />
                  <DeleteOutlineIcon
                    onClick={() => dispatch(handleDeleteFilter(val.column))}
                    sx={{ alignSelf: "center", cursor: "pointer" }}
                    fontSize="small"
                    color="#46596A"
                  />
                </FormControl>
              );
            case "timestamp":
              return (
                <FormControl
                  sx={{ width: "100%", flexDirection: "row", gap: "1rem" }}
                >
                  <DateRangeIcon
                    sx={{ alignSelf: "center" }}
                    fontSize="small"
                  />
                  <Typography
                    border="1px solid rgba(70, 90, 105, 0.4)"
                    borderRadius={1}
                    padding="0.5rem"
                    alignSelf="center"
                    color="#46596A"
                  >
                    {val.column.toUpperCase()}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ padding: "5px" }}
                      components={['DateRangePicker']}
                    >
                      <DateRangePicker 
                        size="small"
                        calendars={1}
                        sx={{ color: "#46596A" }} 
                        value={dateRange}
                        onChange={(e) =>
                          dispatch(
                            handleFilterTypeInputChange({
                              column: val.column,
                              value: e,
                              key: "dateRangeInput",
                            })
                          )
                        }
                        localeText={{ start: 'Start-date (included)', end: 'End-date (excluded)' }} 
                      />
                      {/* <SingleInputDateRangeField
                        size="small"
                        placeholder="Date Range..."
                        value={dateRange}
                        onChange={(e) =>
                          dispatch(
                            handleFilterTypeInputChange({
                              column: val.column,
                              value: e,
                              key: "dateRangeInput",
                            })
                          )
                        }
                        sx={{ color: "#46596A" }}
                      /> */}
                    </DemoContainer>
                  </LocalizationProvider>
                  <DeleteOutlineIcon
                    onClick={() => dispatch(handleDeleteFilter(val.column))}
                    sx={{ alignSelf: "center", cursor: "pointer" }}
                    fontSize="small"
                    color="#46596A"
                  />
                </FormControl>
              );
          }
        })}
      </Box>
      <FormControl sx={{ marginTop: "auto", bottom: "0%" }}>
        <Box display="flex" gap={3} flexDirection="row-reverse">
          <Button
            sx={{
              justifyContent: "start",
              textTransform: "initial",
              boxShadow: "none",
              gap: "0.4rem",
              backgroundColor: "text.main",
              "&:hover": { backgroundColor: "text.main", boxShadow: "none" },
            }}
            variant="contained"
            onClick={() => dispatch(handleAddFilterModalClose("apply"))}
          >
            <Typography color="white.main">Apply</Typography>
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
            onClick={() => dispatch(handleAddFilterModalClose("cancel"))}
          >
            <Typography color="text.main">Cancel</Typography>
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default FilterModal;
