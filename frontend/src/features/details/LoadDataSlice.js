import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: "",
  column: [],
  size: 0,
  data: [],
};

export const fetchData = createAsyncThunk("/fetchData", (body_data) => {
  let data = axios({
    method: "post",
    url: "/filter",
    headers: { "Content-Type": "application/json" },
    data: body_data,
  }).then((response) => response.data);

  return data;
});
export const saveData = createAsyncThunk("/saveData", (body_data) => {
  let data = axios({
    method: "post",
    url: "/save_data",
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
      //   console.log(action.payload);
      let data = action.payload;
      state.data = [];
      state.data = data.data;
      //   console.log("data", data.data);
      state.column = data.column;
      state.size = 0;
      state.size = data.size;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

// export const {} = formSlice.actions;

export default LoadDataSlice.reducer;
