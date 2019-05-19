import { combineReducers } from 'redux';
import { reducer as HomeReducer } from './../pages/home/store';

const reducer = combineReducers({
    header: HomeReducer
})

export default reducer;