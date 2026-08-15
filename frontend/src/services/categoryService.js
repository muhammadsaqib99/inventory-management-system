
import createCrudService from "./createCrudService";

import { API_ENDPOINTS } from "../constants/apiEndpoints";


const categoryService = createCrudService(

    API_ENDPOINTS.CATEGORIES

);


export default categoryService;

