import { actionTypes } from './index';
const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export default function reducer(state=initState,action){
    switch(action.type){
        case actionTypes.MSG_LIST:
            return {...state,users:action.payload.users,chatmsg: action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userId).length}
        case actionTypes.MSG_READ:
        case actionTypes.MSG_RECV:
            const n = action.payload.msg.to===action.payload.userId?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        default:
            return state
    }
}