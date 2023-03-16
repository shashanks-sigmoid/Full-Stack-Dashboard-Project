// import axios from 'axios'
import {
    createSlice
    //  ,createAsyncThunk 
} from '@reduxjs/toolkit'

const initialState = {

    table_name: '',
    queryForm: {},
    addFilterModal: false,

}

// export const fetchInputs = createAsyncThunk('form/fetchInputs', (state) => {

//     let url = 'https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669'
//     url = 'https://run.mocky.io/v3/7ec8da10-b0ee-4016-86a0-100925968a0c'

//     return axios
//         .get(url)
//         .then(response => response.data)

// })

const DetailPreviewSlice = createSlice({
    name: 'detailPreview',
    initialState,
    reducers: {
        handleTableNameOnChange: (state, action) => {
            const { value } = action.payload;
            state.table_name = value;
        },
        handleAddFilterModalOpen: (state) => {
            state.addFilterModal = true;
        },
        handleAddFilterModalClose: (state) => {
            state.addFilterModal = false;
        },
    }
})

export const { handleTableNameOnChange, handleAddFilterModalOpen, handleAddFilterModalClose } = DetailPreviewSlice.actions;
export default DetailPreviewSlice.reducer