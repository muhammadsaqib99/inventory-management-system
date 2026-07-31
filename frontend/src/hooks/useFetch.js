import { useState, useEffect } from "react";

function useFetch(fetchFunction, dependencies = []) {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    async function fetchData() {

        try {

            setLoading(true);

            setError(null);

            const result = await fetchFunction();

            setData(result);

        }

        catch (err) {

            setError(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchData();

    }, dependencies);

    return {

        data,

        loading,

        error,

        refetch: fetchData

    };

}

export default useFetch;