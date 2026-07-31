import api from "../axios/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Test Protected API
export async function testProtectedAPI() {

    const response = api.get(API_ENDPOINTS.STUDENTS);

    return response.data;

}