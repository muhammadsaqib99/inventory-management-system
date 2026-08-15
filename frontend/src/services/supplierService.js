import createCrudService from "./createCrudService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const supplierService = createCrudService(
    API_ENDPOINTS.SUPPLIERS
);

export default supplierService;
