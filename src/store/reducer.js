import { combineReducers } from 'redux';
import { reducer as HomeReducer } from './../pages/home/store';
import { reducer as userList } from './../pages/dashboard/store';
import { reducer as chatUser } from './../pages/chat/store';

const reducer = combineReducers({
    header: HomeReducer,
    userList: userList,
    chatUser: chatUser
})

export default reducer;