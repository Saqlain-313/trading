import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import adminSlice from "./adminSlice";
import promoCodeSlice from "./promoCodeSlice";
import leaderSlice from "./leaderSlice";


const appStore  =  configureStore({

    reducer:{
        user:userReducer,
        admin:adminSlice,
        promo:promoCodeSlice,
        leader:leaderSlice
    }

})


export default appStore ;

