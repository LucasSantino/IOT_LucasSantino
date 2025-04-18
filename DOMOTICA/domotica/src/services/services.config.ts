import axios, {AxiosHeaders, type AxiosResponse } from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCdn = ()=>{
    return getAxios('cdn');
}

export const getApi = ()=>{
    return getAxios('api');
}

export const getAxios = 
    (target:'cdn'|'api', 
     headers: AxiosHeaders = new AxiosHeaders(), 
     params: FormData = new FormData())=> {

    const token = target === 'cdn'? 
        import.meta.env.VITE_CDN_TOKEN : 
        import.meta.env.VITE_API_TOKEN;

    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    
    const createdAxios = axios.create({
        baseURL: `https://${target}${BASE_URL}`,
        headers: headers,
        params: params
    });

    createdAxios.interceptors.response.use(getAxiosResponse);
    return createdAxios;
}

const getAxiosResponse = (response:AxiosResponse)=> {
    return response.data;
}