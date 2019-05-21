import { combineReducers } from 'redux';
import { reducer as HomeReducer } from './../pages/home/store';
import { reducer as userList } from './../pages/dashboard/store';

const reducer = combineReducers({
    header: HomeReducer,
    chatUser: userList
})

export default reducer;