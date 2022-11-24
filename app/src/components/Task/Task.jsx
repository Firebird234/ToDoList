import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { del, loader } from "../../store/taskSlice";
import { EditPopup } from "../EditPopup/EditPopup";
import "./Task.css";

export function Task({ task }) {
   const dispatch = useDispatch();
   // состояние открытия попапа для изменения данных
   const [popupOpened, setPopupOpened] = useState(false);
   //состояние истекло ли время выполнения таски
   const [isExpired, setIsExpired] = useState(false);

   //функция удаления таски
   function handleDelete() {
      dispatch(loader(true));
      dispatch(del(task.index));
      setTimeout(() => {
         dispatch(loader(false));
      }, 2000);
   }
   //функция открытие попапа для изменения таски
   function handleEditPopupOpened(params) {
      setPopupOpened(true);
   }

   // проверка прошла ли дата выполнения таски
   const checkIfExpired = (dateItem) => {
      // дата на выполнение таски
      let date = dayjs(dateItem).hour(23).minute(59);
      // время сейчас
      let now = dayjs();
      if (date.isBefore(dayjs(now))) {
         setIsExpired(true);
      }

      if (date.isAfter(dayjs(now))) {
         setIsExpired(false);
      }
   };

   useEffect(() => {
      // проверяем во время рендера истекло ли время выпонения таски
      checkIfExpired(task.date);
      // проверяем каждые 5 минут не истекло ли время выполнения задачи
      const interval = setInterval(() => {
         checkIfExpired(task.date);
      }, 300000);
      return () => {
         clearInterval(interval);
      };
   }, [task]);

   return (
      <>
         <div className={`task ${isExpired && "task_color_red"} ${task.done && "task_color_green"}`}>
            <div className="task__wrapper">
               <p className="task__title">Заголовок:</p>
               <p className="task__value">{task.name}</p>
            </div>
            <div className="task__wrapper">
               <p className="task__title">Описание:</p>
               <p className="task__value">{task.description}</p>
            </div>
            <div className="task__wrapper">
               <p className="task__title">Дата завершения:</p>
               <p className="task__value">
                  {`${isExpired ? "Время на выполнение вышло-" : ""}`}({task.date})
               </p>
            </div>
            <div className="task__wrapper">
               <p className="task__title">Прикрепленные файлы:</p>
               <p className="task__value">{task.files}</p>
            </div>
            <div className="task__wrapper">
               <p className="task__title">Выполнение</p>
               <p className="task__value">{task.done ? "выполнено" : "не выполнено"}</p>
            </div>
            <button onClick={handleDelete} type="button" className="task__deleteBtn"></button>
            <button onClick={handleEditPopupOpened} type="button" className="task__editBtn"></button>
         </div>
         {popupOpened && <EditPopup task={task} setPopupOpened={setPopupOpened} />}
      </>
   );
}
