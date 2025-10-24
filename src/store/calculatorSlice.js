 import { createSlice } from "@reduxjs/toolkit";

 const calculatorSlice = createSlice({
     name: "calculator",
     initialState: {
         input: "",
         result: "",
         history: [],
         memory: [],
     },
     reducers: {
         setInput: (state, action) => {
             state.input = action.payload;
         },
         setResult: (state, action) => {
             state.result = action.payload;

         },
         clearInput: (state) => {
             state.input = "";
             state.result = "";
         },
         clearHistory: (state) => {
             state.history = [];
         },
         addHistory: (state, action) => {
             state.history.push(action.payload);

         },



     },
 });

 export const { setInput, setResult, clearInput, clearHistory, addHistory } = calculatorSlice.actions;
 export default calculatorSlice.reducer;