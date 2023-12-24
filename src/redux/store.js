import { configureStore } from "@reduxjs/toolkit";
import cryptoslice from "./Reducer/crypto.reducer";

const store = configureStore({
  reducer: {
    cryptoReducer: cryptoslice,
  },
});
export default store;
