import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormAndValidation } from "../../hooks/Validation";
import { edit, loader } from "../../store/taskSlice";
import "./EditPopup.css";

export function EditPopup({ setPopupOpened, task }) {
   //Стейты валидации инпутов
   const { values, handleChange, setValues, errors } = useFormAndValidation();
   //Стэйт созданных задач
   const taskArr = useSelector((state) => state.taskReducer.tasks);
   //Стэйт отвечающий за то выполнено лди задание или нет(подсвечивает зеленым)
   const [isDone, setIsDone] = useState(task.done);

   const dispatch = useDispatch();

   // фунцция изменения таски
   function handleSubmit(e) {
      e.preventDefault();
      //показываем лоадер
      dispatch(loader(true));
      //меняем состояние карточки
      dispatch(edit(values));
      //убираем лоадер
      setTimeout(() => {
         dispatch(loader(false));
      }, 2000);
      setPopupOpened(false);
   }

   // фунцция закрытия попапа
   function handleClose() {
      setPopupOpened(false);
   }

   //функция отвечает за выполнение задачи
   function handleDone() {
      setIsDone(!isDone);
   }

   //устанавливает поле done в стейт
   useEffect(() => {
      setValues({ ...values, done: isDone });
   }, [isDone]);

   //Устанавливает значения инпутов в попап
   useEffect(() => {
      setValues(task);
   }, [taskArr]);
   return (
      <div className="editPopup__container">
         <form className="editPopup">
            <h3>Внесите изменения</h3>
            <label className="editPopup__inputContainer">
               <div className="editPopup__name">Заголовок</div>
               <input className="editPopup__input" name="name" onChange={handleChange} value={values.name} />
            </label>
            <label className="editPopup__inputContainer">
               <div className="editPopup__name">Описание</div>
               <input
                  className="editPopup__input"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
               />
            </label>
            <label className="editPopup__inputContainer">
               <div className="editPopup__name">Дата</div>
               <input
                  type="date"
                  className="editPopup__input"
                  name="date"
                  onChange={handleChange}
                  value={values.date}
               />
            </label>
            <label className="editPopup__inputContainer">
               <div className="editPopup__name">Прикрепленные файлы</div>
               <input className="editPopup__input" name="files" onChange={handleChange} value={values.files} />
            </label>
            <label className="editPopup__inputContainer">
               <div className="editPopup__name">Выполнение</div>
               <input
                  onClick={handleDone}
                  type="checkbox"
                  className="editPopup__input editPopup__input_type_invisible"
                  name="done"
                  onChange={handleChange}
               />
               <div className={`editPoopup__customCheck  ${isDone && "editPoopup__customCheck_type_checked"}`}></div>
            </label>
            <button type="submit" className="editPopup__submitBtn" onClick={handleSubmit}>
               Изменить таску
            </button>
            <button type="button" className="editPopup__closeBtn" onClick={handleClose}></button>
         </form>
      </div>
   );
}
