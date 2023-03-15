import { Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { handleTableNameOnChange } from './DetailPreviewSlice';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import ChooseTable from '../../images/tablechoose.svg'
import TableForm from './TableForm';


function DetailPreview() {

    const detailPreview = useSelector(state => state.detailPreview);
    const table_name = detailPreview.table_name;
    const dispatch = useDispatch();

    return (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
            <Box display='flex' gap='1rem'>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial' }}
                    variant='text'
                    color='text'
                > <Typography color='text'>
                        Details
                    </Typography></Button>
                <Button
                    sx={{ justifyContent: 'start', textTransform: 'initial' }}
                    variant='text'
                    color="white"
                > <Typography color='secondary'>
                        Preview
                    </Typography></Button>
            </Box>
            <Box>
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
                <TableForm /> :
                <Box height='100%' margin='auto'>
                    <Box component='img' width='210px' height='208px' margin='auto' src={ChooseTable} alt="Choose Table" />
                </Box>
            }
        </Box>
    )
}

export default DetailPreview
