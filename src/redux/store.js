import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const server = "http://localhost:4002/api/v1"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createNewPoll = createAsyncThunk('createNewPoll', async ({ name, vote }) => {
    try {
        // console.log(name, vote)
        const response = await axios.post(`http://localhost:4002/api/v1/polldata`,
            { name, vote },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        // console.log(response.data)

        return response.data;
    } catch (error) {
        throw new Error(error)
    }
})

export const allData = createAsyncThunk('allData', async () => {
    try {
        const response = await axios.get(`http://localhost:4002/api/v1/polldata`, {
            params: {
                page: 1,
                size: 10,
            }
        }

        );
        // console.log(response.data)

        return response.data;
    } catch (error) {
        throw new Error(error)
    }


})
export const barChartData = createAsyncThunk('barChartData', async () => {
    try {
        const response = await axios.get(`http://localhost:4002/api/v1/results`,
        );
        // console.log(response.data)

        return response.data;
    } catch (error) {
        throw new Error(error)
    }
})


export const lineChartData = createAsyncThunk('lineChartData', async ({ type }) => {
    try {
        const response = await axios.get(`http://localhost:4002/api/v1/totalvotes?choice=${type}`,
        );
        // console.log(response.data)

        return response.data;
    } catch (error) {
        throw new Error(error)
    }
})




export const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        // loading: false,
        // error: null,
        // message: null,
    },

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
            .addCase(allData.pending, (state) => {
                state.loading = true;
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.loading = false;
                state.allPolls = action.payload.allPolls;
                state.error = null;
            })
            .addCase(allData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(barChartData.pending, (state) => {
                state.loading = true;
            })
            .addCase(barChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.error = null;
            })
            .addCase(barChartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(lineChartData.pending, (state) => {
                state.loading = true;
            })
            .addCase(lineChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.lineGraphData = action.payload.lineGraphData;
                state.error = null;
            })
            .addCase(lineChartData.rejected, (state, action) => {
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