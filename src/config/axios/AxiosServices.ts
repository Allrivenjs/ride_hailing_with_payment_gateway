import process from "process";
import axios from 'axios';
export const env = process.env;
const axiosClient = axios.create({
    // @ts-ignore
    baseURL: env.WOMPI_URL,
});

export default axiosClient;