// import axios from 'axios'
import {
    createSlice
    //  ,createAsyncThunk 
} from '@reduxjs/toolkit'

const initialState = {
    toggle: true,
}

// export const fetchInputs = createAsyncThunk('form/fetchInputs', (state) => {

//     let url = 'https://run.mocky.io/v3/a55c4590-c635-49af-a01f-7ee2e6a85669'
//     url = 'https://run.mocky.io/v3/7ec8da10-b0ee-4016-86a0-100925968a0c'

//     return axios
//         .get(url)
//         .then(response => response.data)

// })

const SideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        handleToggleQueryData: (state, action) => {
            state.toggle = true;
        },
        handleToggleSavedQuery: (state, action) => {
            state.toggle = false
        }
    }
})

export const { handleToggleQueryData, handleToggleSavedQuery } = SideBarSlice.actions;
export default SideBarSlice.reducer