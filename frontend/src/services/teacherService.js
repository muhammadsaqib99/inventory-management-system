import api from "../axios/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";


// Get All Teachers


export async function getTeachers(

    search = "",

    page = 1,

    ordering = ""

) {

    const response = await api.get(

        API_ENDPOINTS.TEACHERS,

        {

            params: {

                search,

                page,

                ordering

            }

        }

    );

    return response.data;

}


// Get Single Teacher


export async function getTeacher(id) {

    const response = await api.get(

        `${API_ENDPOINTS.TEACHERS}${id}/`

    );

    return response.data;

}


// Create Teacher


export async function createTeacher(data) {

    const response = await api.post(

        API_ENDPOINTS.TEACHERS,

        data

    );

    return response.data;

}


// Update Teacher


export async function updateTeacher(id, data) {

    const response = await api.put(

        `${API_ENDPOINTS.TEACHERS}${id}/`,

        data

    );

    return response.data;

}


// Delete Teacher


export async function deleteTeacher(id) {

    const response = await api.delete(

        `${API_ENDPOINTS.TEACHERS}${id}/`

    );

    return response.data;

}