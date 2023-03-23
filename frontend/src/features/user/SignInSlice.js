import {
    createSlice
    , createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loggedIn: 'null',
    loading: false,
    error:"",
    user :{
        email: '',
        password: '',
    }
}

export const handleLoginSubmit = createAsyncThunk("/signInUser", (user, thunkAPI) => {
    let data = axios({
        method: "post",
        url: "/login",
        headers: { "Content-Type": "application/json" },
        data: user,
    })
    .then((response) => {
        console.log(response.data)
        // window.localStorage.setItem("accessToken",response.data.access_token);
        return response.data
    })
    .catch((e)=>{
        return thunkAPI.rejectWithValue(e.response.data);
    });
    return data;
});

export const handleLogOutSubmit = createAsyncThunk("/logOutUser",(thunkAPI)=>{
    let data = axios({
        method: "get",
        url: "/logout",
        headers: { "Content-Type": "application/json" },
    })
    .then((response)=>{
        return response.data
    })
    .catch((e)=>{
        return thunkAPI.rejectWithValue(e.response.data);
    })
    return data;
})



const SignInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        handleUserInputChange: (state, action) => {
            const { key, value } = action.payload;
            state.user[key] = value;
        },
        handleClearInput: (state,action) => {
            const key = action.payload;
            state.user[key] = '';
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(handleLoginSubmit.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleLoginSubmit.fulfilled, (state, action) => {
            state.loading = false;
            const data = action.payload
            state.loggedIn = data.access_token;
            state.error = "";
        });
        builder.addCase(handleLoginSubmit.rejected, (state, action) => {
            state.loading = false;
            state.inputs = [];
            state.error = action.error.message;
        });
        builder.addCase(handleLogOutSubmit.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleLogOutSubmit.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = "null";
            state.user = {
                email: '',
                password: '',
            }
            state.error = "";
            window.location.reload();
        });
        builder.addCase(handleLogOutSubmit.rejected, (state, action) => {
            state.loading = false;
            state.inputs = [];
            state.error = action.error.message;
        });
    },
})

export const { handleUserInputChange, handleClearInput } = SignInSlice.actions;
export default SignInSlice.reducer