import axios, { AxiosRequestConfig } from 'axios';
// import 'vite/client'

export interface FetchResponse<T> {
    offset: number,
    number: number,
    results: T[]
}



const axiosInstance = axios.create({
    baseURL: 'https://api.spoonacular.com',
    params: {
        apiKey: import.meta.env.VITE_API_KEY
    }
})


class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = async (config: AxiosRequestConfig) => {
        return axiosInstance.get<T>(this.endpoint + '/complexSearch', config).then(res => res.data)
    }

    get = async (id: number | string) => {
        return axiosInstance.get<T>(this.endpoint + '/' + id + '/information').then(res => res.data)
    }

    getBulk = async (config: AxiosRequestConfig) => {
        return axiosInstance.get<T>(this.endpoint + '/informationBulk', config).then(res => res.data)
    }

}

export default APIClient;