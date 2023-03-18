import {
    createSlice
    , createAsyncThunk
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import axios from 'axios';

const initialState = {

    table_name: '',
    allColumns: [],
    queryForm: {
        query_data: '',
        columns: [],
        limit: '50',
        filters: [],
        sorted_by: ['', '0'],
    },
    loading: true,
    error: "",
    addFilterModal: false,
    fixedColumnsProducts: {
        'crawl_timestamp': 'timestamp', 'retail_price': 'int', 'discounted_price': 'int'
        , 'product_rating': 'string', 'overall_rating': 'string'
    },
    fixedColumnsCustomers: { 'company_name': 'string', 'city': 'string', 'county': 'string', 'zip': 'timestamp', 'web': 'int' },
    details: true,
    load: false,
}

export const fetchColumn = createAsyncThunk("/fetchColumn", (table_name) => {
    let data = axios({
        method: "post",
        url: "/column_name",
        headers: { "Content-Type": "application/json" },
        data: { table_name: table_name.toLowerCase() },
    }).then((response) => response.data);
    return data;
});

const DetailPreviewSlice = createSlice({
    name: 'detailPreview',
    initialState,
    reducers: {
        handleOnSubmit: (state) => {
            const data = {
                "table_name": state.table_name,
                "sorted_by": state.queryForm.sorted_by,
                "limit": state.queryForm.limit,
                "columns": state.queryForm.columns,
                "filters": state.queryForm.filters,
                "query_name": state.queryForm.query_data,
            }
            console.log(data);
            state.queryForm = {
                query_data: '',
                columns: [],
                limit: '50',
                filters: [],
                sorted_by: ['', '0'],
            }
        },
        handleInputChange: (state, action) => {
            const { key, value } = action.payload;
            state.queryForm[key] = value;
        },
        handleTableNameOnChange: (state, action) => {
            const { value } = action.payload;
            state.allColumns = [];
            state.table_name = value;
            state.queryForm.filters = [];
            state.queryForm.query_data = '';
            state.queryForm.columns = [];
            state.queryForm.limit = '50';
            state.queryForm.sorted_by = ['', '0'];
        },
        handleCheckBoxInputChange: (state, action) => {
            const { key, val, checked } = action.payload
            if (checked) {
                (state.queryForm[key] ||= []).push(val)
            }
            else {
                const index = (state.queryForm[key] ||= []).indexOf(val)
                if (index > -1) {
                    state.queryForm[key].splice(index, 1)
                }
            }
        },
        handleSelectClearChange: (state, action) => {
            const option = action.payload
            if (option === 'select') {
                state.queryForm.columns = state.allColumns.map((column, idx) => {
                    return column[0];
                })
            }
            else if (option === 'cancel') {
                state.queryForm.columns = []
            }
        },
        handleAddFilterModalOpen: (state) => {
            state.addFilterModal = true;
        },
        handleAddFilterModalClose: (state, action) => {
            state.addFilterModal = false;
            if (action.payload === 'cancel') {
                state.queryForm.filters = [];
            }
        },
        handleFilterColumns: (state, action) => {
            const { value, key } = action.payload;
            let dataType = key.slice(2);
            state.queryForm.filters.forEach((obj, idx) => {
                if (obj.column == value) {
                    state.queryForm.filters.splice(idx, 1);
                }
            })
            // state.filterColumns.push(value);
            if (dataType === 'string') {
                state.queryForm.filters.unshift({ "value": "", "column": value, "type": dataType, "filter_type": "Contains" })
            }
            else if (dataType === 'int') {
                state.queryForm.filters.unshift({ "value": "", "column": value, "type": dataType, "filter_type": "Less Than" })
            }
            else if (dataType === 'timestamp') {
                state.queryForm.filters.unshift({ "dateRange": [dayjs(), dayjs()], "column": value, "type": dataType })
            }
        },
        handleDeleteFilter: (state, action) => {
            const column = action.payload;
            state.queryForm.filters.forEach((obj, idx) => {
                if (obj.column === column) {
                    state.queryForm.filters.splice(idx, 1);
                }
            })
        },
        handleFilterTypeInputChange: (state, action) => {
            const { column, value, key } = action.payload;
            state.queryForm.filters.forEach((obj, idx) => {
                if (obj.column === column) {
                    if (key === 'filterType')
                        obj.filter_type = value;
                    else if (key === 'inputText') {
                        obj.value = value;
                    }
                    else if (key === 'dateRangeInput') {
                        obj.dateRange = value;
                    }
                }
            });
        },
        handlePreview: (state) => {
            state.details = false;
            state.load = false;
        },
        handleLoad: (state) => {
            state.load = true;
        },
        handleDetail: (state) => {
            state.details = true;
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchColumn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchColumn.fulfilled, (state, action) => {
            state.loading = false;
            let data = action.payload;
            state.allColumns = data.data
            state.error = "";
        });
        builder.addCase(fetchColumn.rejected, (state, action) => {
            state.loading = false;
            state.inputs = [];
            state.error = action.error.message;
        });
    },
})

export const { handleTableNameOnChange, handleCheckBoxInputChange, handleAddFilterModalOpen, handleAddFilterModalClose
    , handleFilterColumns, handleDeleteFilter, handleInputChange, handleSelectClearChange, handleFilterTypeInputChange,
    handlePreview, handleDetail, handleLoad, handleOnSubmit } = DetailPreviewSlice.actions;
export default DetailPreviewSlice.reducer