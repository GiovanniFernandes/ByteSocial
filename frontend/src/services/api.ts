import axios from "axios";

export const api = axios.create({
    baseURL:`http://localhost:${process.env.API_URL || 3021}`
});