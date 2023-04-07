import axios from "axios";

export const api = axios.create({
    baseURL:`http://localhost:${process.env.API_URL || 3021}`
});

export const settingAxios = () => {
    const storeData = localStorage.getItem('authToken');

        if(!storeData) return false;
        
        return {
            headers: {
                Authorization: "Bearer "+storeData
            },
            validateStatus: (status:any) => {
                return status < 500; // Resolve somente se o código de status for menor que 500
            } 
        }
}