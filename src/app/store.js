import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Reducers";

// const store = createStore(Reducer); //deprecated

const store = configureStore({
    reducer: Reducer 
}); 

export default store;