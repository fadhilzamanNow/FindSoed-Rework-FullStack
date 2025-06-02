import basePath from "../baseApi"

export const getMatchLocation = async (locationName : string) => {
    try{
        const response = await basePath(`/location/find/${locationName}`)
        
    }catch(e){
        
    }
}

export const getReverseLocation = async (latitude : number, longitude : number) => {
    try{
        console.log("aman 1")
        const response = await basePath.get(`/location/reverse/lat=${latitude}&lon=${longitude}`)
        if(response){
            return response.data
        }
    }catch(e){
        console.log("gak aman")
        throw e
    }
}