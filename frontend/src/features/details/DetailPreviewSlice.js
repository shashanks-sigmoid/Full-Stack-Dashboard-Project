import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "axios";
// import { fetchData } from "./LoadDataSlice";

const initialState = {
  table_name: "",
  allColumns: [],
  queryId: -1,
  queryForm: {
    query_data: "",
    columns: [],
    limit: "50",
    filters: [],
    sorted_by: ["", "asc"],
  },
  download: "false",
  downloadToggle: true,
  loading: true,
  error: "",
  addFilterModal: false,
  fixedColumnsProducts: {
    crawl_timestamp: "timestamp",
    retail_price: "int",
    discounted_price: "int",
    product_rating: "string",
    overall_rating: "string",
  },
  fixedColumnsCustomers: {
    company_name: "string",
    city: "string",
    county: "string",
    zip: "string",
    web: "string",
  },
  details: true,
  load: false,
  save: false,
  saveToggle: false,
  isUpdated: false,
};

export const fetchColumn = createAsyncThunk("/fetchColumn", (table_name) => {
  let data = axios({
    method: "post",
    url: "/column_name",
    headers: { "Content-Type": "application/json" },
    data: { table_name: table_name.toLowerCase() },
  }).then((response) => response.data);
  return data;
});

export const fetchSavedDataById = createAsyncThunk("/fetchSavedDataById", (id) => {
    let data = axios({
      method: "get",
      url: `/get_saved_data_by_id/${id}`,
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.data);
    return data;
  });

export const updateDataById = createAsyncThunk("/updateDataById", (parameter) => {
    const {id, bodyData} = parameter;
    console.log(id, bodyData)
    let data = axios({
      method: "post",
      url: `/update_saved_data/${id}`,
      headers: { "Content-Type": "application/json" },
      data: bodyData
    }).then((response) => response.data);
    return data;
  });
  

const DetailPreviewSlice = createSlice({
  name: "detailPreview",
  initialState,
  reducers: {
    handleOnSubmit: (state) => {
      if (
        state.table_name &&
        state.queryForm.query_data &&
        state.queryForm.columns.length > 0
      ) {
        state.download = "true";
        state.downloadToggle = !state.downloadToggle;
      }
    },
    handleOnSave: (state) => {
      if (
        state.table_name &&
        state.queryForm.query_data &&
        state.queryForm.columns.length > 0
      ) {
        state.save = "true";
        state.saveToggle = !state.saveToggle;
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
      state.queryForm.query_data = "";
      state.queryForm.columns = [];
      state.queryForm.limit = "50";
      state.queryForm.sorted_by = ["", "asc"];
      state.isUpdated = false;
    },
    handleCheckBoxInputChange: (state, action) => {
      const { key, val, checked } = action.payload;
      if (checked) {
        (state.queryForm[key] ||= []).push(val);
      } else {
        const index = (state.queryForm[key] ||= []).indexOf(val);
        if (index > -1) {
          state.queryForm[key].splice(index, 1);
        }
      }
    },
    handleSelectClearChange: (state, action) => {
      const option = action.payload;
      if (option === "select") {
        state.queryForm.columns = state.allColumns.map((column, idx) => {
          return column[0];
        });
      } else if (option === "cancel") {
        state.queryForm.columns = [];
      }
    },
    handleAddFilterModalOpen: (state) => {
      state.addFilterModal = true;
    },
    handleAddFilterModalClose: (state, action) => {
      state.addFilterModal = false;
      if (action.payload === "cancel") {
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
      });
      // state.filterColumns.push(value);
      if (dataType === "string") {
        state.queryForm.filters.unshift({
          value: "",
          column: value,
          type: dataType,
          filter_type: "Contains",
        });
      } else if (dataType === "int") {
        state.queryForm.filters.unshift({
          value: "",
          column: value,
          type: dataType,
          filter_type: "Less Than",
        });
      } else if (dataType === "timestamp") {
        state.queryForm.filters.unshift({
          dateRange: [dayjs(), dayjs()],
          column: value,
          type: dataType,
        });
      }
    },
    handleDeleteFilter: (state, action) => {
      const column = action.payload;
      state.queryForm.filters.forEach((obj, idx) => {
        if (obj.column === column) {
          state.queryForm.filters.splice(idx, 1);
        }
      });
    },
    handleFilterTypeInputChange: (state, action) => {
      const { column, value, key } = action.payload;
      state.queryForm.filters.forEach((obj, idx) => {
        if (obj.column === column) {
          if (key === "filterType") obj.filter_type = value;
          else if (key === "inputText") {
            obj.value = value;
          } else if (key === "dateRangeInput") {
            obj.dateRange = value;
          }
        }
      });
    },
    handlePreview: (state) => {
      if (
        state.table_name &&
        state.queryForm.query_data &&
        state.queryForm.columns.length > 0
      ) {
        state.details = false;
        state.load = false;
        state.download = "false";
      }
    },
    handleLoad: (state) => {
      state.load = true;
      state.download = "false";
    },
    handleDetail: (state) => {
      state.details = true;
    },
    handleAddDownloadModelClose: (state) => {
      state.download = "false";
    },
    handleAddSaveModelClose: (state) => {
      state.save = false;
    },
    handleClearQuery: (state) => {
      state.queryForm = {
        query_data: "",
        columns: [],
        limit: "50",
        filters: [],
        sorted_by: ["", "asc"],
      };
      state.save = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColumn.fulfilled, (state, action) => {
      state.loading = false;
      let data = action.payload;
      state.allColumns = data.data;
      state.error = "";
    });
    builder.addCase(fetchColumn.rejected, (state, action) => {
      state.loading = false;
      state.inputs = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchSavedDataById.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(fetchSavedDataById.fulfilled, (state, action) => {
        state.loading = false;
        let data = action.payload;
        state.table_name = data.data[0][0].table_name;
        state.queryForm.query_data = data.data[0][1];
        state.queryForm.limit = data.data[0][0].limit;
        state.queryForm.sorted_by = data.data[0][0].sorted_by;
        state.queryForm.columns = data.data[0][0].column;
        state.queryForm.filters = data.data[0][0].filter;
        state.queryId = data.data[0][2];
        state.error = "";
        state.isUpdated = true;
    });
    builder.addCase(fetchSavedDataById.rejected, (state, action) => {
        state.loading = false;
        state.inputs = [];
        state.error = action.error.message;
    });
    builder.addCase(updateDataById.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(updateDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        window.location.reload()
    });
    builder.addCase(updateDataById.rejected, (state, action) => {
        state.loading = false;
        state.inputs = [];
        state.error = action.error.message;
    });
  },
});

export const {
  handleTableNameOnChange,
  handleCheckBoxInputChange,
  handleAddFilterModalOpen,
  handleAddFilterModalClose,
  handleFilterColumns,
  handleDeleteFilter,
  handleInputChange,
  handleSelectClearChange,
  handleFilterTypeInputChange,
  handlePreview,
  handleDetail,
  handleLoad,
  handleOnSubmit,
  handleAddDownloadModelClose,
  handleOnSave,
  handleAddSaveModelClose,
  handleClearQuery,
} = DetailPreviewSlice.actions;
export default DetailPreviewSlice.reducer;
