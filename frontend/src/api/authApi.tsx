import axios from "axios";

const instance = axios.create({
    baseURL :  process.env.REACT_APP_SERVER_IP,
    timeout : 1000,
    withCredentials : true
});

axios.interceptors.request.use(
    function(config){
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers.Authorization = token;
        }
        return config
    }, function(error){
        return error
    }
);

axios.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error);
    }
);

export const getMember = async (): Promise<any> => {
    return instance.get('api/member')
        .then((response) => {
            return response;
        })
        .catch((e) => {
            return e.response;
        });
};