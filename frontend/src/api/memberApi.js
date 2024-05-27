import axios from "axios";

const DOMAIN = "http://localhost:8080";

export const MemberApi = {
    signUp: async (data) => {
        const response = await axios.post(`${DOMAIN}/join`, data);
        return response;
    }
};