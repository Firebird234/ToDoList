import { useState, useCallback } from "react";

// кастомный хук для валидации формы
export function useFormAndValidation() {
   //Состояние со значениями инпутов
   const [values, setValues] = useState({
      name: "",
      description: "",
      date: "",
      files: "",
      done: "",
   });
   //Состояние со значениями ошибок
   const [errors, setErrors] = useState({});
   //Состояние валидности всей формы
   const [isValid, setIsValid] = useState(true);

   const handleChange = (e) => {
      const { name, value } = e.target;
      //проверка на наличие значения
      if (e.target.validity.valueMissing === true) {
         setErrors({
            ...errors,
            [name]: "Будь котиком, зополни пустое поле",
         });
      }
      //проверка на необходимую длину текста в поле
      else if (e.target.validity.tooShort === true) {
         setErrors({
            ...errors,
            [name]: "Коротковато, тут надо хотя бы 10символов",
         });
      }
      //проверка на встроенные ошибки валидации
      else {
         setErrors({ ...errors, [name]: e.target.validationMessage });
      }

      //Запись данных из инпутов в состояние
      setValues({ ...values, [name]: value });
      setIsValid(e.target.closest("form").checkValidity());
   };

   // const resetForm = useCallback(
   //    (newValues = {}, newErrors = {}, newIsValid = false) => {
   //       setValues(newValues);
   //       setErrors(newErrors);
   //       setIsValid(newIsValid);
   //    },
   //    [setValues, setErrors, setIsValid]
   // );

   return {
      values,
      handleChange,
      errors,
      isValid,
      setValues,
      setIsValid,
   };
}
