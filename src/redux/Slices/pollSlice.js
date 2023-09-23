import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../store";



export const createNewPoll = createAsyncThunk('createNewPoll', async () => {
    try {
        const response = await axios.post(`${server}/polldata`,
            {name, vote, date},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
})

export const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewPoll.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewPoll.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(createNewPoll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})


