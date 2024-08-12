import axios from "axios";
//process.env.REACT_APP_Server_IP
const instance = axios.create({
    baseURL : 'http://localhost:8080',
    timeout : 1000,
    withCredentials : true
});
instance.interceptors.request.use(
    function(config){
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers['Authorization'] = accessToken;
        }
        return config
    }, 
    function(error){
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error);
    }
);

export const getMember = async (): Promise<any> => {
    return instance.get('/api/member')
        .then((response) => {
            return response;
        })
        .catch((e) => {
            return e.response;
        });
};