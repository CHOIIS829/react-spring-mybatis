import axios, { AxiosResponse } from 'axios';
import { JoinRequest, JoinResponse, loginRequest, loginResponse } from '../types/member';

const baseUrl = "http://localhost:8080"

export const memberJoin = async (data: JoinRequest): Promise<JoinResponse | any> => {
    try {
        const response: AxiosResponse<JoinResponse> = await axios.post(`${baseUrl}/join`, data);
        return response
    } catch (e) {
        if (axios.isAxiosError(e) ) {
            return e.response;
        }
    }
};

export const memberLogin = async (data: loginRequest): Promise<loginResponse | any> => {
    try{
        axios.defaults.withCredentials = true;        
        const response : AxiosResponse<any> = await axios.post(`${baseUrl}/login`, data);
        return response;
    }catch(e){
        if(axios.isAxiosError(e)){
            return e.response;
        }        
    }
}



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