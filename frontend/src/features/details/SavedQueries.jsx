import React,  { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchSavedData } from './SavedQuerySlice';
import { handleToggleQueryData } from '../sidebar/SideBarSlice';
import { fetchSavedDataById } from './DetailPreviewSlice';
import { useSelector, useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E6E8ED",
    color: "#465A69",
    fontSize: 16,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(query_name, created_on, last_queried_on, request_type) {
  return { query_name, created_on, last_queried_on, request_type };
}

const originalRows = [
  createData(
    "Brazil Campaign 10981",
    "1 week ago",
    "June 20, 2022",
    "Bulk data Request"
  ),
  createData(
    "Lizol Revenue Last 3 months",
    "May 5, 2020",
    "2 days Ago",
    "Instant Download"
  ),
  createData(
    "Brazil Campaign 10982",
    "1 week ago",
    "June 20, 2022",
    "Bulk data Request"
  ),
  createData(
    "Lizol Revenue Last 3 months",
    "May 5, 2020",
    "2 days Ago",
    "Instant Download"
  ),
  createData(
    "Brazil Campaign 10983",
    "1 week ago",
    "June 20, 2022",
    "Bulk data Request"
  ),
];

function SavedQueries() {

  const [alignment, setAlignment] = React.useState("left");
  const [searched, setSearched] = React.useState("");

  const savedQuery = useSelector((state) => state.savedQuery);
  const savedData = savedQuery.savedData;

  const [rows, setRows] = React.useState(savedData);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchSavedData())
  },[dispatch])

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const requestSearch = (searchedVal) => {
    if (!searchedVal) {
      setRows(savedData);
    } else {
      const filteredRows = savedData.filter((row) => {
        return row[1].toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem" minHeight="100vh">
      <Typography variant="h5" color="text.main">
        Saved Queries
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={3}
      >
        <FormControl sx={{ gap: "0.5rem", width: "25rem" }}>
          <TextField
            aria-labelledby="query-id"
            required
            fullWidth
            id="query-id"
            placeholder="Search"
            size="small"
            sx={{ backgroundColor: "#E6E8ED" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searched}
            onInput={(e) => {
              requestSearch(e.target.value);
            }}
            onChange={(e) => setSearched(e.target.value)}
          />
        </FormControl>
        <Box display="flex" gap="1rem">
          <Button
            sx={{
              justifyContent: "start",
              textTransform: "initial",
              boxShadow: "none",
              gap: "0.4rem",
              backgroundColor: "#46596A",
            }}
            variant="contained"
            size="small"
          >
            {" "}
            <Typography color="white.main">Filters</Typography>
            <FilterAltIcon fontSize="small" />
          </Button>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            color="primary"
            size="small"
          >
            <ToggleButton
              value="left"
              sx={{
                backgroundColor: "#46596A",
                color: "white.main",
                ":hover": { color: "black" },
              }}
              aria-label="left aligned"
            >
              <ListIcon />
            </ToggleButton>
            <ToggleButton
              value="right"
              sx={{
                backgroundColor: "#46596A",
                color: "white.main",
                ":hover": { color: "black" },
              }}
              aria-label="right aligned"
            >
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Query Name</StyledTableCell>
              <StyledTableCell align="center">Created On</StyledTableCell>
              <StyledTableCell align="center">Last Queried On</StyledTableCell>
              <StyledTableCell align="center">Request Type</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, ind) => (
              <StyledTableRow key={ind} onClick={()=>{
                dispatch(fetchSavedDataById(row[0]));
                dispatch(handleToggleQueryData());
                }}>
                <StyledTableCell component="th" scope="row">
                  {row[1]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row[2]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row[3]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row[4]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <MoreVertIcon />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SavedQueries;
