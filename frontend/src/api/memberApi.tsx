import axios from 'axios';
import { JoinRequest, JoinResponse, loginRequest } from '../types/member';

const instance = axios.create({
    baseURL : process.env.REACT_APP_Server_IP,
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
            let accessToken = response.headers['authorization']; 
            localStorage.setItem('accessToken', accessToken);
            return response;
        }) 
        .catch((e) => {
            return e.response; 
        });
};
