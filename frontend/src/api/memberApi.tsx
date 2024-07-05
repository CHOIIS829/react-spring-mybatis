import axios, { AxiosResponse } from 'axios';
import { JoinRequest, JoinResponse,JoinError } from '../types/member';

const baseUrl = "http://localhost:8080"

export const memberJoin = async (data: JoinRequest): Promise<JoinResponse | JoinError> => {
    try {
        const response: AxiosResponse<JoinResponse> = await axios.post(`${baseUrl}/join`, data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorResponse: JoinError = {
                message: e.response.data.message
            };
            return errorResponse;
        } else {
            return {
                message: 'An unknown error occurred'
            };
        }
    }
};