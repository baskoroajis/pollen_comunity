import {IS_LOADING,IS_FAILED,IS_SUCCESS} from "./PollenAction";

const initialState = {
   data: {},
   loading: false,
   error: ''
};

export function data(state = initialState, action) {
   switch (action.type) {
       case IS_LOADING: {
           return {
               ...state,
               loading: true,
               error:''
           };
       }
       case IS_SUCCESS: {
           return {
               ...state,
               data: action.data,
               loading: false
           }
       }
       case IS_FAILED: {
           return {
               ...state,
               loading: false,
               error: action.error
           };
       }
       default: {
           return state;
       }
   }
}