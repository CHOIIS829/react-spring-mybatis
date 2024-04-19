import axios from "axios"

const server = "http://localhost:8080"

export const memberApi = {
    memberLogin : async(email) =>{
        return await axios.get(server + '/api/member/', {
            params:{
                email : email
            }
        })
    }
}