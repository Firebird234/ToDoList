import { combineReducers, configureStore } from "@reduxjs/toolkit"
import taskSlice from "./taskSlice"

const rootReducer = combineReducers({
    taskReducer: taskSlice
})
export const store = configureStore({reducer: rootReducer})