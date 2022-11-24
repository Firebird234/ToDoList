import { createSlice, current } from "@reduxjs/toolkit";
import { getTasks } from "./asyncFunc/getTasks";

//первоначальное состояние 
const initialState = {
    tasks: [],
    loader: false
}

//слайс для изменения состояния задач
const taskSlice = createSlice({
    name: 'TASK_SLICE',
    initialState,
    reducers: {
        //добавление задачи
        add(state,action) {
            state.tasks.push(action.payload)
        },
        //удаление задачи
        del(state,action) {
            state.tasks = state.tasks.filter((el) => {
                return el.index !== action.payload
            })
        },
        //правка задачи
        edit(state,action) {
            let ind = state.tasks.findIndex(el => {
                return el.index === action.payload.index
            })
            state.tasks[ind] = action.payload
        },
        //состояние лоадера
        loader(state,action) {
            state.loader = action.payload
        }
    },
    //запрос задач с апи
    extraReducers: {
        [getTasks.pending]: (state, action) => {
           state.status = "pending";
        },
        [getTasks.fulfilled]: (state, action) => {
           state.status = "resolved";
           state.tasks = action.payload;
        },
        [getTasks.rejected]: (state, action) => {
           state.status = "rejected";
        },
     },
})

export const {add, del, edit,loader} = taskSlice.actions;
export default taskSlice.reducer;
