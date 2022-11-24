import { uploadString } from "firebase/storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData, storageRef } from "../../fireBase";
import { getTasks } from "../../store/asyncFunc/getTasks";
import { loader } from "../../store/taskSlice";
import { EditPopup } from "../EditPopup/EditPopup";
import { Task } from "../Task/Task";
import "./TaskList.css";

export function TaskList() {
   const taskArr = useSelector((state) => state.taskReducer.tasks);
   const dispatch = useDispatch();

   //
   useEffect(() => {
      //показываем лоадер
      dispatch(loader(true));
      //получаем карточки через апи
      dispatch(getTasks());
      //убираем лоадер
      setTimeout(() => {
         dispatch(loader(false));
      }, 2000);
   }, []);

   return (
      <div className="taskList">
         {taskArr.map((el) => {
            return <Task key={el.index} task={el} />;
         })}
      </div>
   );
}
