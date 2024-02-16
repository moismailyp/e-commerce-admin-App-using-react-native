import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer,persistStore } from "redux-persist";
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { InKartReducer } from "./reducer";

const persistConfig=
{
    key:'InKartAdmin',
    storage:AsyncStorage,
};
const persistedReducer=persistReducer(persistConfig,InKartReducer)
const store=configureStore(
   { reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck:false,

    })
}
)
let persister=persistStore(store);
export {store,persister}