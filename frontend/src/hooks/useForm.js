import { useState } from "react";

function useForm(initialValues) {

    const [values, setValues] = useState(initialValues);

    function handleChange(e) {

        const { name, value } = e.target;

        setValues((prev) => ({

            ...prev,

            [name]: value

        }));

    }

    function resetForm() {

        setValues(initialValues);

    }

    return {

        values,

        handleChange,

        resetForm,

        setValues

    };

}

export default useForm;