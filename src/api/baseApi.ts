import axios from "axios";


const basePath = axios.create({
    baseURL: "http://localhost:3500",
    timeout:1000,
})

basePath.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`
    
    return config
})

export type ErrorFindSoed = {
    success : boolean,
    message : string,
    data : Array<any>
}

export default basePath;