import React,{Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../pages/dashboard/store';
import UserCard from './../userCard';
const {
    getUserList
} = actionCreators

@connect(
    ({chatUser})=>({chatUser}),
    { getUserList}
)
class Boss extends Component{
    
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return(
            <div>
                <UserCard userList={this.props.chatUser.userList} />
            </div>
        )
    }
}

export default Boss;