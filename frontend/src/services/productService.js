
import createCrudService from "./createCrudService";

import { API_ENDPOINTS } from "../constants/apiEndpoints";


const productService = createCrudService(

    API_ENDPOINTS.PRODUCTS

);


export default productService;

