import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as dataReducer from './PollenReducer'

const Apps = storage.reducer(combineReducers({
  data: dataReducer.data
}))

export default Apps