import axios from "axios";
const myApiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://flight-radar1.p.rapidapi.com";
// console.log(myApiKey, "MYAPİKEY")


export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-RapidAPI-Key": myApiKey,
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
});