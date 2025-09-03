import axios from "axios";


export const BASE_URL = "https://prosphere-ax6v.onrender.com"

export const clientServer = axios.create({
    baseURL: BASE_URL,
})