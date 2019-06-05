import axios from 'axios';
import io from 'socket.io-client';
import { actionTypes } from './index'
const socket =  io('ws://localhost:9093');

function msgList(msgs,users,userId){
    return {type:actionTypes.MSG_LIST,payload:{msgs,users,userId}}
}
function msgRecv(msg,userId){
    return {type:actionTypes.MSG_RECV,payload:{msg,userId}}
}
function msgRead({from,to,num}){
    return {type:actionTypes.MSG_READ,payload:{from,to,num}}
}
export function recvMsg(){
    return (dispatch,getState)=>{
        const {_id} = JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):'';
        socket.on('recvmsg',function(data){
            console.log(data,'aaaa')
            dispatch(msgRecv(data,_id))
        })
    }
}
export function sendMsg(from,to,msg){
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
}
export function getMsgList(){
    return (dispatch,getState)=>{
        const {_id} = JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):'';
        axios.get('/user/getmsglist',{params:{_id}})
            .then(res=>{ 
                if(res.status===200 && res.data.code===0){
                    dispatch(msgList(res.data.msgs,res.data.users,_id))
                }
            })
    }
}
export function readMsg(from){
    return (dispatch,getState)=> {
        const _id = (JSON.parse(localStorage.getItem('userInfo')))._id?(JSON.parse(localStorage.getItem('userInfo')))._id:'';
        axios.post('/user/readmsg',{from,_id})
            .then(res=>{
                if(res.status===200 && res.data.code===0){
                    dispatch(msgRead({from,_id,num:res.data.num}))
                }
            })
    }
}