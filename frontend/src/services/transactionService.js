import createCrudService from "./createCrudService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const transactionService = createCrudService(
    API_ENDPOINTS.TRANSACTIONS
);

export default transactionService;