import {
    Box, FormControl, FormLabel, TextField, InputAdornment, Button, Typography, Grid, FormGroup,
    FormControlLabel, Checkbox, Select, MenuItem, RadioGroup, Radio, Modal
} from '@mui/material'
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import FilterModal from './FilterModal';

function TableForm() {

    const columns = ['column_1', 'column_2', 'column_3', 'column_4', 'column_5', 'column_6', 'column_7', 'column_8', 'column_9'
        , 'column_10', 'column_11', 'column_12', 'column_13']

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
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
                            onClick={handleOpen}
                        > <AddIcon fontSize='small' />
                            <Typography color='white.main'>
                                Add Filters
                            </Typography>
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
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
                                    label='50 records in CSV'
                                    control={<Radio />}
                                />
                                <FormControlLabel

                                    value='all'
                                    label='Full Data Dump in CSV'
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
        </Box>
    )
}

export default TableForm