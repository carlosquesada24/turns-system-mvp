import { useState } from "react";

interface Validations {
  [key: string]: (value: any) => string[];
}

export const useForm = <T extends {}>(
  initialState: T,
  validations: Validations
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<any>({});

  const reset = () => {
    setValues(initialState);
    setErrors({});
  };

  const handleInputChange = (name: string, value: string) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: any, value: any) => {
    let newErrors: string[] = [];

    if (validations[name]) {
      newErrors = validations[name](value);
    }

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: newErrors,
    }));

    return newErrors;
  };

  const validateAllFields = () => {
    const newErrors: any = {};
    let isValid = true;

    for (const key in values) {
      if (validations[key]) {
        const fieldErrors = validations[key](values[key]);
        newErrors[key] = fieldErrors;
        if (fieldErrors.length > 0) {
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: any) => {
    validateAllFields();
    e.preventDefault();
  };

  return {
    values,
    errors,
    handleInputChange,
    validateField,
    validateAllFields,
    reset,
  };
};
