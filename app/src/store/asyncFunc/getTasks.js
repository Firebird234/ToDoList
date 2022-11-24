import { createAsyncThunk } from "@reduxjs/toolkit";

import {  getDownloadURL } from "firebase/storage";
import { firestore, storageRef } from "../../fireBase";

import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 


//функция запроса к апи
export const getTasks = createAsyncThunk("TASK_SLICE/GET__TASKS", async (tasks) => {
      const response = await getDoc(doc(firestore, "tasks/array")).then((res) => res.data().tasks).catch((err) => console.log(err));
      return response;
});




