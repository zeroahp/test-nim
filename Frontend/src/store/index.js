import { configureStore } from "@reduxjs/toolkit";
import nimSlice from "../redux/nimSlice";

const store = configureStore({
    reducer: {
      NimGame: nimSlice
    }
})

export default store;