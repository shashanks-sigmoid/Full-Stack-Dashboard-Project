import {
    Box, FormControl, FormLabel, TextField, InputAdornment, Button, Typography, Grid, FormGroup,
    FormControlLabel, Checkbox, Select, MenuItem, RadioGroup, Radio, Modal
} from '@mui/material'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleTableNameOnChange, handleAddFilterModalOpen, handleAddFilterModalClose } from './DetailPreviewSlice';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import FilterModal from './FilterModal';
import ChooseTable from '../../images/tablechoose.svg'
import axios from 'axios';

function TableForm() {

    const detailPreview = useSelector(state => state.detailPreview);
    const table_name = detailPreview.table_name;
    const addFilterModal = detailPreview.addFilterModal;
    const dispatch = useDispatch();

    const [columns, setColumns] = React.useState([])

    useEffect(() => {
        if (table_name) {
            axios
                .get('http://localhost:5051/column_name/', {
                    params: {
                        table_name: "customers",
                        schema_name: "public"
                    },
                })
                .then(response => {
                    console.log(response.data.data)
                    const arr = []
                    response.data.data.forEach(element => {
                        arr.push((element[0].charAt(0).toUpperCase() + element[0].slice(1)))
                    });
                    setColumns(arr);
                    console.log(arr, columns)

                })
                .catch((e) => console.log(e.message))
        }
        else {
            setColumns([])
        }

    }, [table_name])

    return (
        <Box>
            <Box marginBottom={3}>
                <FormControl sx={{ display: 'flex' }}>
                    <Grid
                        container
                        rowSpacing={0}
                        columnSpacing={4}
                        fontSize='0.9rem'
                    >
                        <Grid item xs={4} >
                            <FormControl sx={{ gap: '0.5rem' }} fullWidth>
                                <FormLabel
                                    id='query-id'
                                >
                                    Query Data*
                                </FormLabel>
                                <TextField
                                    aria-labelledby='query-id'
                                    required
                                    fullWidth
                                    id="query-id"
                                    placeholder='Untitled Query - 1'
                                    size="small"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} gap={1}>
                            <FormControl sx={{ gap: '0.5rem' }} fullWidth>
                                <FormLabel
                                    id='select-table'
                                >
                                    Table Name*
                                </FormLabel>
                                <Box display='flex' gap='0.5rem' >
                                    <Select
                                        aria-labelledby='select-table'
                                        sx={{ color: '#46596A' }}
                                        fullWidth
                                        size='small'
                                        displayEmpty
                                        defaultValue=''
                                        value={table_name}
                                        onChange={(e) =>
                                            dispatch(handleTableNameOnChange({ value: e.target.value }))}
                                        renderValue={(value) => (value !== '' ? value : 'Select Table')}
                                        required
                                    >
                                        <MenuItem sx={{ color: '#46596A' }} value='Customers'>Customers </MenuItem>
                                        <MenuItem sx={{ color: '#46596A' }} value='Products'>Products </MenuItem>

                                    </Select>
                                    <ErrorIcon color='secondary' sx={{ alignSelf: 'center' }} />
                                </Box>
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
            {table_name ?
                <FormControl sx={{ display: 'flex' }}>
                    <FormControl sx={{ gap: '0.5rem', marginBottom: '2rem' }} fullWidth>
                        <FormLabel
                            id='choose-column'
                        >
                            Choose Columns that you want*
                        </FormLabel>
                        <Box
                            border='1px solid rgba(70, 90, 105, 0.5)'
                            borderRadius={1}
                            padding={2}
                        >
                            <Box
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                            >
                                <TextField
                                    required
                                    id="search-columns"
                                    placeholder='Search Column...'
                                    size="small"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                                        endAdornment: <InputAdornment position='end'><HighlightOffIcon /></InputAdornment>
                                    }}
                                />
                                <Box display='flex' gap='1rem' >
                                    <Button
                                        sx={{
                                            justifyContent: 'start',
                                            textTransform: 'initial',
                                            boxShadow: 'none',
                                            gap: '0.4rem',
                                            backgroundColor: 'rgba(70, 90, 105, 0.08)',
                                            ':hover': {
                                                backgroundColor: 'rgba(70, 90, 105, 0.08)',
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant='contained'
                                        size='small'
                                    > <Typography variant='subtitle' color='#46596A'>
                                            Select All
                                        </Typography>
                                    </Button>
                                    <Button
                                        sx={{
                                            justifyContent: 'start',
                                            textTransform: 'initial',
                                            boxShadow: 'none',
                                            gap: '0.4rem',
                                            backgroundColor: 'rgba(70, 90, 105, 0.08)',
                                            ':hover': {
                                                backgroundColor: 'rgba(70, 90, 105, 0.08)',
                                                boxShadow: 'none'
                                            }
                                        }}
                                        variant='contained'
                                        size='small'
                                    > <Typography variant='subtitle' color='#46596A'>
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
                                    padding={1}
                                    marginTop={1}
                                >
                                    {columns.map((opt, idx) => {
                                        return (<Grid
                                            item xs={2.4}
                                            key={idx}
                                            borderRight={(idx + 1) % 5 === 0 ? 'none' : '1px dashed #46596A'}
                                        >
                                            <FormControlLabel
                                                sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}
                                                key={idx}
                                                value={opt}
                                                label={<Box display='flex' gap={0.5} color='#46596A'>{idx % 2 === 0 ? <ShowChartIcon fontSize='small' /> : <DateRangeIcon fontSize='small' />} {opt}</Box>}
                                                control={<Checkbox checked
                                                    value={opt}
                                                    size="small"
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: '#46596A',
                                                        }
                                                    }}
                                                />}
                                                labelPlacement="start"
                                            />
                                        </Grid>)
                                    })}
                                </Grid>
                            </FormGroup>

                        </Box>
                    </FormControl>
                    <FormControl sx={{ gap: '0.5rem', marginBottom: '2rem' }} fullWidth>
                        <FormLabel
                            id='filter-column'
                        >
                            Applied Filters
                        </FormLabel>
                        <Box display='flex' gap={3}>
                            <Typography color='text.main' fontSize='0.75rem' alignSelf='center'>No Filters Applied</Typography>
                            <Button
                                sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', gap: '0.4rem', backgroundColor: '#46596A' }}
                                variant='contained'
                                size='small'
                                onClick={() => dispatch(handleAddFilterModalOpen())}
                            > <AddIcon fontSize='small' />
                                <Typography color='white.main'>
                                    Add Filters
                                </Typography>
                            </Button>
                            <Modal
                                open={addFilterModal}
                                onClose={() => dispatch(handleAddFilterModalClose())}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <FilterModal />
                            </Modal>
                        </Box>

                    </FormControl>
                    <FormControl sx={{ gap: '0.5rem', marginBottom: '2rem' }} fullWidth>
                        <FormLabel
                            id='sorted-column'
                        >
                            Data Sorted By*
                        </FormLabel>
                        <Box display='flex' gap={3}>
                            <FormControl>
                                <Select
                                    aria-labelledby='select-column'
                                    sx={{ color: '#46596A' }}
                                    size='small'
                                    displayEmpty
                                    defaultValue=''
                                    renderValue={(value) => (value !== '' ? value : 'Select Column')}
                                    required
                                >
                                    {columns.map((opt, idx) => {
                                        return <MenuItem sx={{ color: '#46596A' }} value={opt}>{opt.toUpperCase()} </MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                            <FormControl>
                                <Select
                                    aria-labelledby='select-asc-desc'
                                    sx={{ color: '#46596A' }}
                                    size='small'
                                    displayEmpty
                                    defaultValue='Ascending'
                                    required
                                >
                                    <MenuItem sx={{ color: '#46596A' }} value='Ascending'>Ascending </MenuItem>
                                    <MenuItem sx={{ color: '#46596A' }} value='Descending'>Descending </MenuItem>

                                </Select>
                            </FormControl>
                        </Box>

                    </FormControl>
                    <FormControl sx={{ gap: '0.5rem', marginBottom: '2rem' }} fullWidth>
                        <FormLabel
                            id='sorted-column'
                        >
                            Output Format*
                        </FormLabel>
                        <Box display='flex' gap={3}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby='radio-buttons-records'
                                    defaultValue='50'
                                    name="radio-buttons-records"
                                >
                                    <FormControlLabel

                                        value='50'
                                        fontSize='0.75rem'
                                        label='50 records in CSV'
                                        sx={{ color: '#46596A' }}
                                        control={<Radio />}
                                    />
                                    <FormControlLabel

                                        value='all'
                                        fontSize='0.75rem'
                                        label='Full Data Dump in CSV'
                                        sx={{ color: '#46596A' }}
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </FormControl>
                    <FormControl
                        sx={{ gap: '0.5rem', backgroundColor: 'rgba(70, 90, 105, 0.08)', padding: '0.5rem', marginBottom: '0.5rem' }}
                        fullWidth
                    >
                        <Box display='flex' gap={3} flexDirection='row-reverse'>
                            <Button
                                sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', gap: '0.4rem', backgroundColor: 'text.main' }}
                                variant='contained'

                            >
                                <Typography color='white.main'>
                                    Download Data
                                </Typography>

                            </Button>
                            <Button
                                sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', border: '1px solid #FF0081', gap: '0.4rem', backgroundColor: 'transparent' }}
                                variant='outlined'

                            >
                                <Typography color='text.main'>
                                    Save Query
                                </Typography>

                            </Button>
                            <Button
                                sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', border: '1px solid #FF0081', gap: '0.4rem', backgroundColor: 'transparent' }}
                                variant='outlined'

                            >
                                <Typography color='text.main'>
                                    Cancel
                                </Typography>

                            </Button>
                        </Box>
                    </FormControl>
                </FormControl>
                :
                <Box display='flex' minHeight='60vh' alignItems='center'>
                    <Box component='img' width='210px' height='208px' margin='auto' src={ChooseTable} alt="Choose Table" />
                </Box>
            }
        </Box>
    )
}

export default TableForm