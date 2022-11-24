import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, loader } from "../../store/taskSlice";
import "./TaskForm.css";
import { randUuid } from "@ngneat/falso";
import { useFormAndValidation } from "../../hooks/Validation";

export function TaskForm(params) {
   const dispatch = useDispatch();

   const { values, handleChange, setValues, errors } = useFormAndValidation();

   //функция добавления таски при сабмите формы
   function handleSubmit(e) {
      e.preventDefault();
      dispatch(loader(true));
      dispatch(add({ ...values, index: `${randUuid()}` }));
      setTimeout(() => {
         dispatch(loader(false));
      }, 2000);
      setValues({ name: "", description: "", date: "", files: "", done: false });
   }

   return (
      <form className="taskForm" onSubmit={handleSubmit}>
         <h2 className="taskForm__title">Добавьте таксу</h2>
         <label className="taskForm__inputContainer">
            <div className="taskForm__name">Заголовок</div>
            <input
               minLength="2"
               maxLength="30"
               className="taskForm__input"
               required
               name="name"
               onChange={handleChange}
               value={values.name}
            />
            <span className="taskForm__err">{errors.name}</span>
         </label>
         <label className="taskForm__inputContainer">
            <div className="taskForm__name">Описание</div>
            <input
               className="taskForm__input"
               required
               name="description"
               onChange={handleChange}
               value={values.description}
               minLength="10"
               max="100"
            />
            <span className="taskForm__err">{errors.description}</span>
         </label>
         <label className="taskForm__inputContainer">
            <div className="taskForm__name">Дата</div>
            <input
               type="date"
               className="taskForm__input"
               required
               name="date"
               onChange={handleChange}
               value={values.date}
            />
            <span className="taskForm__err">{errors.date}</span>
         </label>
         <label className="taskForm__inputContainer">
            <div className="taskForm__name">Прикрепленные файлы</div>
            <input
               className="taskForm__input taskForm__input_type_file"
               type="file"
               name="files"
               onChange={handleChange}
               value={values.files}
            />
         </label>
         <button type="submit" className="taskForm__submitBtn" onSubmit={handleSubmit}>
            Добавить таску
         </button>
      </form>
   );
}
