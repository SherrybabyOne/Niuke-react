import { actionTypes } from './index'
const initState = {
    userList: []
}

export default function chatuer(state=initState,action){
    switch(action.type){
        case actionTypes.USER_LIST:
            return {...state,userList:action.payload}
        default:
            return state
    }
}