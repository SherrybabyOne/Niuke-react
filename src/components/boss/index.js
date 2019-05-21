import React,{Component} from 'react';
import { Card,WhiteSpace,WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { actionCreators } from './../../pages/dashboard/store';
const {
    getUserList
} = actionCreators

@connect(
    ({chatUser})=>({chatUser}),
    { getUserList}
)
class Boss extends Component{

    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    componentDidMount(){
        this.props.getUserList('genius')
    }
    render(){
        return(
            <div>
                <WingBlank>
                    {this.props.chatUser.userList.map(v=>(
                        v.avatar?
                        (
                            <Card key={v.user}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`./../../assets/img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                ></Card.Header>
                                <WhiteSpace />
                                <Card.Body>
                                    {v.desc.split('\n').map(item=>(
                                        <div key={item}>{item}</div>
                                    ))}
                                </Card.Body>
                            </Card>
                        )
                        :
                        null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default Boss;