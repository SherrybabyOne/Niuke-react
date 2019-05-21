import axios from 'axios';
import { actionTypes } from './index';

export function userList(data){
    return { type:actionTypes.USER_LIST,payload:data }
}
export function getUserList(type){
    return dispatch=>{
        axios.get(`/user/list?type=${type}`)
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(userList(res.data.data))
                }
        })
    }
}