import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/useApi";

// clear LocalStorage
function clearLocalStorage() {
  localStorage.removeItem("flights");
  // console.log("localStorage cleared");
}

//update LocalStorage
setInterval(clearLocalStorage, 60000);

const fetchFlights = createAsyncThunk("flights/fetchFlights", async () => {
  const response = await api.get("/flights/list-in-boundary", {
    params: {
      bl_lat: "34.5273",
      bl_lng: "25.5273",
      tr_lat: "42.3876",
      tr_lng: "44.2448",
      limit: "300",
    },
  });
  const newData = response.data.aircraft.map((flight) => ({
    id: flight[0],
    code: flight[1],
    latitude: flight[2],
    longitude: flight[3],
    altitude: flight[4],
    speed: flight[5],
    heading: flight[6],
    identifier: flight[8],
    model: flight[9],
    timestamp: flight[11],
  }));
  //   console.log(response.data.aircraft[0]);
  // console.log(newData[10])

  return newData;
});

export default fetchFlights;
