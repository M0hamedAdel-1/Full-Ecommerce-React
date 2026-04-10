import axios from "axios";

const baseurl = "https://kidskiosk-api.vercel.app/api"

export const axiosInstance = axios.create(
    {
    baseURL:baseurl,
    headers: {"Content-Type": "application/json",},
    }) 


