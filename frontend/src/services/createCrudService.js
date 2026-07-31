import api from "../axios/axios";

function createCrudService(endpoint) {

    return {

        
        // Get All
        

        async getAll(params = {}) {

            const response = await api.get(

                endpoint,

                {

                    params

                }

            );

            return response.data;

        },

        
        // Get One
      

        async getOne(id) {

            const response = await api.get(

                `${endpoint}${id}/`

            );

            return response.data;

        },

      
        // Create
        

        async create(data) {

            const response = await api.post(

                endpoint,

                data

            );

            return response.data;

        },

        
        // Update
       

        async update(id, data) {

            const response = await api.put(

                `${endpoint}${id}/`,

                data

            );

            return response.data;

        },

        
        // Delete
        

        async remove(id) {

            const response = await api.delete(

                `${endpoint}${id}/`

            );

            return response.data;

        }

    };

}

export default createCrudService;