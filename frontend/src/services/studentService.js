import createCrudService from "./createCrudService";
import api from "../axios/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Get All Students

const crud = createCrudService(
    API_ENDPOINTS.STUDENTS
);
export async function getStudents(

    search = "",

    page = 1,

    ordering = "",

    teacher = "",

    age = ""

) {

    const response = await api.get(

        API_ENDPOINTS.STUDENTS,

        {

            params: {

                search,

                page,

                ordering,

                teacher,

                age

            }

        }

    );

    return response.data;

}

// Get Single Student
export const getStudent = crud.getOne;

export const createStudent = crud.create;

export const updateStudent = crud.update;

export const deleteStudent = crud.remove;