import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = 'http://localhost:3000/api';

export const axiosPostHandler = async (subUrl: string, data: any, headers: AxiosRequestConfig['headers'] | null = null) => {
    try {
        console.log(`${BASE_URL}/${subUrl}`);
        const response = await axios.post(`${BASE_URL}/${subUrl}`, data, {headers});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const axiosGetHandler = async (
    subUrl: string,
    params: any = {},
    headers: AxiosRequestConfig['headers'] | null = null
) => {
    try {
        console.log(`${BASE_URL}/${subUrl}`);
        const response = await axios.get(`${BASE_URL}/${subUrl}`, {
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};