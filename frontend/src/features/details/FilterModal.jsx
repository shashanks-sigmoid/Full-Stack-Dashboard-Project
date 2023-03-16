import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react';
import { useDispatch } from 'react-redux';
import { handleAddFilterModalClose } from './DetailPreviewSlice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotesIcon from '@mui/icons-material/Notes';
import DateRangeIcon from '@mui/icons-material/DateRange';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1246,
    height: 556,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
};

function FilterModal() {

    const dispatch = useDispatch();

    const [addFilter, setAddFilter] = React.useState(false);
    const handleAddFilterOpen = () => setAddFilter(true);
    const handleAddFilterClose = () => setAddFilter(false);
    const handleDeleteFilter = (column) => {
        console.log(column)
    };

    const filter_columns = [['column_one', 'string'], ['column_two', 'int'], ['column_three', 'timestamp'], ['column_four', 'string'], ['column_five', 'timestamp']]
    const string_option = ['StartWith', 'Contains', 'EndsWith']
    const int_option = ['Less than', 'Equal to', 'More than']

    return (
        <Box display='flex' flexDirection='column' gap={3} sx={style} >
            <Box display='flex' justifyContent='space-between'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Apply Filters
                </Typography>
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(handleAddFilterModalClose())} />

            </Box>
            <Box display='flex' flexDirection='column' gap={2}>
                <Button
                    sx={{ width: '15%', justifyContent: 'center', textTransform: 'initial', boxShadow: 'none', gap: '0.4rem', backgroundColor: '#46596A' }}
                    variant='contained'
                    size='small'
                    onClick={handleAddFilterOpen}
                > <AddIcon fontSize='small' />
                    <Typography color='white.main'>
                        Add New Row
                    </Typography>
                </Button>
                {addFilter &&
                    <FormControl sx={{ width: '25%', flexDirection: 'row', gap: '1rem' }}>
                        <Select
                            aria-labelledby='select-column'
                            sx={{ width: '80%', color: '#46596A' }}
                            size='small'
                            displayEmpty
                            defaultValue=''
                            renderValue={(value) => (value !== '' ? value : 'Select Column')}
                            required
                        >
                            {filter_columns.map((opt, idx) => {
                                return <MenuItem key={idx} sx={{ color: '#46596A' }} value={opt[0]}>{opt[0].toUpperCase()} </MenuItem>
                            })}

                        </Select>
                        <DeleteOutlineIcon onClick={handleAddFilterClose} sx={{ alignSelf: 'center', cursor: 'pointer' }} fontSize='small' color='#46596A' />
                    </FormControl>
                }
                {filter_columns.map((val, idx) => {
                    const columnType = val[1];
                    switch (columnType) {
                        case "string":
                            return (
                                <FormControl sx={{ width: '50%', flexDirection: 'row', gap: '1rem' }}>
                                    <NotesIcon sx={{ alignSelf: 'center' }} fontSize='small' />
                                    <Typography border='1px solid rgba(70, 90, 105, 0.4)' borderRadius={1} padding='0.5rem' alignSelf='center' color='#46596A'>{val[0]}</Typography>
                                    <Select
                                        aria-labelledby='select-range'
                                        sx={{ width: '80%', color: '#46596A' }}
                                        size='small'
                                        displayEmpty
                                        defaultValue=''
                                        renderValue={(value) => (value !== '' ? value : 'Select Column')}
                                        required
                                    >
                                        {string_option.map((opt, idx) => {
                                            return <MenuItem sx={{ color: '#46596A' }} value={opt}>{opt} </MenuItem>
                                        })}

                                    </Select>
                                    <TextField
                                        required
                                        fullWidth
                                        id={val[0]}
                                        placeholder='Type word or sentences..'
                                        size="small"
                                    />
                                    <DeleteOutlineIcon onClick={() => handleDeleteFilter(val[0])} sx={{ alignSelf: 'center', cursor: 'pointer' }} fontSize='small' color='#46596A' />
                                </FormControl>
                            )
                        case "int":
                            return (
                                <FormControl sx={{ width: '45%', flexDirection: 'row', gap: '1rem' }}>
                                    <ShowChartIcon sx={{ alignSelf: 'center' }} fontSize='small' />
                                    <Typography border='1px solid rgba(70, 90, 105, 0.4)' borderRadius={1} padding='0.5rem' alignSelf='center' color='#46596A'>{val[0]}</Typography>
                                    <Select
                                        aria-labelledby='select-range'
                                        sx={{ width: '80%', color: '#46596A' }}
                                        size='small'
                                        displayEmpty
                                        defaultValue=''
                                        renderValue={(value) => (value !== '' ? value : 'Select Column')}
                                        required
                                    >
                                        {int_option.map((opt, idx) => {
                                            return <MenuItem sx={{ color: '#46596A' }} value={opt}>{opt} </MenuItem>
                                        })}

                                    </Select>
                                    <TextField
                                        type='number'
                                        required
                                        fullWidth
                                        id={val[0]}
                                        placeholder='Type number..'
                                        size="small"
                                    />
                                    <DeleteOutlineIcon onClick={() => handleDeleteFilter(val[0])} sx={{ alignSelf: 'center', cursor: 'pointer' }} fontSize='small' color='#46596A' />
                                </FormControl>
                            )
                        case "timestamp":
                            return (
                                <FormControl sx={{ width: '100%', flexDirection: 'row', gap: '1rem' }}>
                                    <DateRangeIcon sx={{ alignSelf: 'center' }} fontSize='small' />
                                    <Typography border='1px solid rgba(70, 90, 105, 0.4)' borderRadius={1} padding='0.5rem' alignSelf='center' color='#46596A'>{val[0]}</Typography>
                                    <FormControl sx={{ width: '20%' }}>
                                        <Select
                                            aria-labelledby='select-range'
                                            sx={{ color: '#46596A' }}
                                            size='small'
                                            displayEmpty
                                            defaultValue=''
                                            renderValue={(value) => (value !== '' ? value : 'Select Column')}
                                            required
                                        >
                                            {string_option.map((opt, idx) => {
                                                return <MenuItem sx={{ color: '#46596A' }} value={opt}>{opt} </MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer sx={{ padding: 'unset' }}
                                            components={['SingleInputDateRangeField', 'SingleInputDateRangeField']}
                                        >
                                            <SingleInputDateRangeField
                                                size='small'
                                                placeholder="Date Range..."
                                                sx={{ color: '#46596A' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <DeleteOutlineIcon onClick={() => handleDeleteFilter(val[0])} sx={{ alignSelf: 'center', cursor: 'pointer' }} fontSize='small' color='#46596A' />
                                </FormControl>
                            )
                    }
                })}
            </Box>
            <FormControl
                sx={{ marginTop: 'auto', bottom: '0%' }}
            >
                <Box display='flex' gap={3} flexDirection='row-reverse'>
                    <Button
                        sx={{ justifyContent: 'start', textTransform: 'initial', boxShadow: 'none', gap: '0.4rem', backgroundColor: 'text.main' }}
                        variant='contained'

                    >
                        <Typography color='white.main'>
                            Apply
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
        </Box>
    )
}

export default FilterModal;