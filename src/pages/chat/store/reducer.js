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
            const {from,num} = action.payload;
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read: from===v.from?true:v.read})), unread:state.unread-num}
        case actionTypes.MSG_RECV:
            const n = action.payload.msg.to===action.payload.userId?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload.msg],unread:state.unread+n,read:false}
        default:
            return state
    }
}