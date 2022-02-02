import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name:'home',
    initialState:{
        hasRegistered: false,
        testState: 'test',
    },
    reducers:{
        setHasRegistered: (state, action)=>{
            state.hasRegistered = action.payload;
        },
        setTestState: (state, action)=>{
            state.testState = action.payload;
        }
    },
    // extraReducers:{
    //     [getTimesheets.pending]: (state, action)=>{
    //         state.status = 'loading'
    //     },
    //     [getTimesheets.fulfilled]: (state, {payload}) => {
    //         state.timesheets= payload
    //         state.status = 'success'
    //     },
    //     [getTimesheets.rejected]: (state, action) => {
    //         state.status = 'failed'
    //     },
    // }
});

export const selectHasRegistered = (state) => state.home.hasRegistered;
export const selectTestState = (state) => state.home.testState;

export const { setHasRegistered, setTestState } = homeSlice.actions;

export default homeSlice.reducer