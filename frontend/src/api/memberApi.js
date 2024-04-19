import axios from "axios"

const server = "http://localhost:8080"

export const memberApi = {
    memberGet : async()=>{
        return await axios.get(server + '/api/members')
        .then((response)=>{console.log(response)})
        .catch((error) => console.log(error));
    },
    memberLogin : async(data)=>{
        return await axios.post(server + '/api/member/login',data)
        .then((response)=>{console.log(response)})
        .catch((error) => console.log(error));
    }
}