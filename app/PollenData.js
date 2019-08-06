import  { IS_LOADING , IS_FAILED, IS_SUCCESS} from './PollenAction';
import * as api from './PollenApi'
import { put  } from 'redux-saga/effects'

export function* data (action) {
      try {
        const {data} = yield api.data();
        if (typeof data.comunities === 'undefined'){
            yield put({ type: IS_SUCCESS, data })
        }
        else{
            yield put({type: IS_FAILED, error:  'Unexpected Error!!!'  });
        }
     
      } catch (error) {
        console.log("error" +error);
      }
  }