import axios from "axios";


const basePath = axios.create({
    baseURL: "http://localhost:3500",
    timeout: 5000,
})

basePath.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`
    
    return config
})

basePath.interceptors.response.use((response) => response, (error) =>  {
    if(error.response.status = 401){
        localStorage.removeItem("authToken")
    }
})

export type ErrorFindSoed = {
    success : boolean,
    message : string,
    data : Array<any>
}

export default basePath;