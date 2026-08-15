import api from "../axios/axios";


function createCrudService(endpoint) {

    return {

        // =========================
        // GET ALL
        // =========================

        async getAll(params = "") {

            const response = await api.get(
                `${endpoint}${params}`
            );

            return response.data;

        },


        // =========================
        // GET ONE
        // =========================

        async getById(id) {

            const response = await api.get(
                `${endpoint}${id}/`
            );

            return response.data;

        },


        // =========================
        // CREATE
        // =========================

        async create(data) {

            const response = await api.post(
                endpoint,
                data
            );

            return response.data;

        },


        // =========================
        // UPDATE
        // =========================

        async update(id, data) {

            const response = await api.put(
                `${endpoint}${id}/`,
                data
            );

            return response.data;

        },


        // =========================
        // DELETE
        // =========================

        async remove(id) {

            const response = await api.delete(
                `${endpoint}${id}/`
            );

            return response.data;

        }

    };

}


export default createCrudService;