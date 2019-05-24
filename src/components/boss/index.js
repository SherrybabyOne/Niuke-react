import React,{Component} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../pages/dashboard/store';
import UserCard from './../userCard';
const {
    getUserList
} = actionCreators

@connect(
    ({userList})=>({userList}),
    { getUserList}
)
class Boss extends Component{
    
    componentDidMount(){
        this.props.getUserList('genius')
    }
    render(){
        return(
            <div>
                <UserCard userList={this.props.userList.userList} />
            </div>
        )
    }
}

export default Boss;