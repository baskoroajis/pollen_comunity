import { takeEvery  } from 'redux-saga/effects'
import * as saga from './PollenData';
import  { IS_LOADING} from './PollenAction';

export default function * dataSaga () {
    yield takeEvery(IS_LOADING, saga.data) 
}
