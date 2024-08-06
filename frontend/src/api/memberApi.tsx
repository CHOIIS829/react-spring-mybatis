import axios from 'axios';
import { JoinRequest, JoinResponse, loginRequest } from '../types/member';

const instance = axios.create({
    baseURL : "http://localhost:8080",
    timeout : 1000,
    withCredentials: true 
});

export const memberJoin = async (data: JoinRequest): Promise<JoinResponse | any> => {
    return instance.post('join' , data)
        .then((response) => {
            return response;
        })
        .catch((e) => {
            return e.response;
        })
};

export const memberLogin = (data: loginRequest): Promise<any> => {
    return instance.post('login', data)
        .then((response) => {
            console.log(response.data);
            let accessToken = response.headers['authorization']; 
            localStorage.setItem('accessToken', accessToken);
            return response;
        })
        .catch((e) => {
            return e.response; 
        });
};
