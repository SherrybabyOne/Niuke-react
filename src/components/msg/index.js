import React,{Component} from 'react';
import { connect } from 'react-redux';
import { List,Badge } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { getMsgList,recvMsg } from './../../pages/chat/store/actionCreators'
const ListItem = List.Item;
const Brief = List.Item.Brief;

@withRouter
@connect(
    state=>({state}),
    { getMsgList,recvMsg }
)
class Msg extends Component{

    componentDidMount(){
        this.props.getMsgList()
        this.props.recvMsg()
    }

    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        const userId = JSON.parse(localStorage.getItem('userInfo'))._id
        //按聊天用户分组，根据chatId
        const msgGroup = {};
        this.props.state.chatUser.chatmsg.forEach(element => {
            msgGroup[element.chatId] = msgGroup[element.chatId] || [];
            msgGroup[element.chatId].push(element)
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last
        })
        return(
            <div>
                <List> 
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v);
                        const targetId = v[0].from===userId?v[0].to:v[0].from;
                        const userInfo = this.props.state.userList.userList;
                        const unreadNum = v.filter((v)=>!v.read&&v.to===userId).length || 0;
                        if(!userInfo.some(v=>{
                            return v._id === targetId
                        })){
                            return null;
                        }
                        let name,avatar;
                        userInfo.map(v=>{
                            if(v._id === targetId){
                                name = v.user;
                                avatar = v.avatar;
                            }
                        })
                        return (
                        <ListItem
                            extra={<Badge text={unreadNum}></Badge>}
                            key={lastItem._id}
                            thumb={require(`./../../assets/img/${avatar}.png`)}
                            arrow='horizontal'
                            onClick={()=>{
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        >
                            {lastItem.content}
                            <Brief>{name}</Brief>
                        </ListItem>)
                    })}
                </List>
            </div>
        )
    }
}

export default Msg;