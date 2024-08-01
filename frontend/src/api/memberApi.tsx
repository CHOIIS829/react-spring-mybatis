import axios, { AxiosResponse } from 'axios';
import { JoinRequest, JoinResponse, loginRequest } from '../types/member';

const instance = axios.create({
    baseURL : "http://localhost:8080",
    timeout : 1000
});

export const memberJoin = async (data: JoinRequest): Promise<JoinResponse | any> => {
    try {
        const response: AxiosResponse<JoinResponse> = await instance.post('/join', data);
        return response
    } catch (e) {
        if (axios.isAxiosError(e) ) {
            return e.response;
        }
    }
};

export const memberLogin = (data: loginRequest): Promise<any> => {
    instance.defaults.withCredentials = true;
    return instance.post('login', data)
        .then((res) => {
            console.log(res);
            let accessToken = res.headers['authorization']; // 응답헤더에서 토큰 받기
            console.log(accessToken);
            return res;
        })
        .catch((error) => {
            console.log(error);
            throw error; 
        });
};




// axios.defaults.withCredentials = true; // withCredentials 전역 설정
// axios
//   .post(`${URL}/login`, data)
//   .then((res) => {
//     if (res.status === 200) {
//       // 모든 헤더 이름은 소문자
//       let accessToken = res.headers['authorization']; // 응답헤더에서 토큰 받기
//       let refreshToken = res.headers['refresh']; // 응답헤더에서 토큰 받기
//       console.log('access 토큰 :', accessToken);
//       console.log('refresh 토큰 :', refreshToken);
//       setLocalStorage('access_token', accessToken); // 토큰 localStorage에 저장
//       axios.defaults.headers.common[
//         'Authorization'
//       ] = `Bearer ${accessToken}`;
//       navigate('/');
//     }
//   })