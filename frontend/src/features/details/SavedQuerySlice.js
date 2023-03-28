import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  error: "",
  savedData: [],
};

export const fetchSavedData = createAsyncThunk("/fetchSavedData", () => {
  let data = axios({
    method: "get",
    url: "/get_all_saved_data",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.data);

  return data;
});

const SavedQuerySlice = createSlice({
  name: "savedQuery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSavedData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedData.fulfilled, (state, action) => {
      state.loading = false;
      let data = action.payload;
    //   state.savedData = [];
      state.savedData = data.data;
      state.error = "";
    });
    builder.addCase(fetchSavedData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

// export const {} = formSlice.actions;

export default SavedQuerySlice.reducer;