import { configureStore } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const server = "http://localhost:4001/api/v1"
export const createNewPoll = createAsyncThunk('createNewPoll', async (formdata) => {
    console.log(formdata)
    try {
        const response = await axios.post(`${server}/polldata`,
            formdata,
            // console.log(formdata),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const data = {
            name: formdata.get('name'),
        }
        // const response = await fetch(`${server}/polldata`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         method: "POST",
        //         body: JSON.stringify(formdata),

        //     }
        // );

        return response.json();
    } catch (error) {
        throw new Error(error)
    }

})

const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewPoll.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewPoll.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.newPoll = action.payload.newPoll;
                state.error = null;
            })
            .addCase(createNewPoll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})

const store = configureStore({
    reducer: {
        poll: pollSlice.reducer,
    }
})


export default store;