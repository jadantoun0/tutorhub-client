import { useState } from "react"

const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues);
    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({ ...values, [name]: value})
    }

    const resetForm = () => {
        setValues(initialValues);
    }

    return {values, handleInputChange, resetForm}
}

export default useForm