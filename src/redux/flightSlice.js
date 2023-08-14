import { createSlice } from "@reduxjs/toolkit";
import fetchFlights from "./actions";

const initialState = {
  flights: JSON.parse(localStorage.getItem("flights")) || [],
  isLoading: false,
  isError: false,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},
  //   extraReducers: {
  //     [fetchFlights.pending]: (state) => {
  //       state.isLoading = true;
  //     },
  //     [fetchFlights.fulfilled]: (state, action) => {
  //       state.isLoading = false;
  //       state.fligths = action.payload;
  //     },
  //     [fetchFlights.rejected]: (state) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(fetchFlights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFlights.fulfilled, (state, { payload }) => {
      state.flights = payload;
      localStorage.setItem("flights", JSON.stringify(payload));
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchFlights.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      console.log(" error has occurred in flightReducer");
    });
  },
});

export default flightSlice.reducer;
