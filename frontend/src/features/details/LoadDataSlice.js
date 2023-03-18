import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    error: "",
    column: [],
    size: 0,
    data: [],
};
let body_data = {
    table_name: "products",
    sorted_by: "crawl_timestamp",
    limit: 50,
    column: [
        "uniq_id",
        "crawl_timestamp",
        "product_url",
        "product_name",
        "retail_price",
        "discounted_price",
    ],
    filter: [
        {
            start_date: "2016-03-25",
            end_date: "2016-06-29",
            column: "crawl_timestamp",
            type: "timestamp",
        },
    ],
    download: "false",
};
export const fetchData = createAsyncThunk("/fetchData", () => {
    let data = axios({
        method: "post",
        url: "/filter",
        headers: { "Content-Type": "application/json" },
        data: body_data,
    }).then((response) => response.data);

    return data;
});

const LoadDataSlice = createSlice({
    name: "loadData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            let data = action.payload;
            state.data = data.data;
            state.column = data.column;
            state.size = data.size;
            state.error = "";
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.inputs = [];
            state.error = action.error.message;
        });
    },
});

// export const {} = formSlice.actions;

export default LoadDataSlice.reducer;