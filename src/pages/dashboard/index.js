import React,{Component} from 'react';
import { TabBar,NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import Boss from './../../components/boss';
import Genius from './../../components/genius';
import User from './../../components/user';
import { getMsgList,sendMsg,recvMsg } from './../chat/store/actionCreators';

function Msg(){
    return (
        <h2>消息首页</h2>
    )
}

@connect(
    ({chatUser})=>({chatUser}),
    { getMsgList,recvMsg }
)
class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            list: [],
            navList: []
        }
    }
    componentDidMount(){
        if(!this.props.chatUser.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || '';
        const {type} = userInfo;
        const navList =[
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: type==='genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: type==='boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        const list = navList.filter(v=>(!v.hide))
        this.setState({
            list,
            navList
        })
    }

    renderContent(pathname) {
        switch(pathname){
          case '/boss':
            return <Boss />
          case '/genius':
              return <Genius />
          case '/msg':
            return <Msg />
          case '/me':
            return <User />
          default:
            return null
        }
    }

    render(){
        const { pathname } = this.props.location;
        return(
            <div style={{height:'100vh'}}>
                <TabBar tabBarPosition='bottom'>
                    {this.state.list.map(item=>(
                        <TabBar.Item
                            key={item.path}
                            title={item.title}
                            icon={{uri:require(`./../../assets/${item.icon}.png`)}}
                            selectedIcon={{uri:require(`./../../assets/${item.icon}-active.png`)}}
                            selected={pathname===item.path}
                            onPress={()=>{
                                this.props.history.push(item.path)
                            }}
                            badge={item.path==='/msg' ? this.props.chatUser.unread : 0}
                            // badge={item.path==='/msg'&& this.props.chatUser.unread}
                        >
                            <NavBar mode='dark'>
                                {this.state.navList.find(v=>v.path===this.props.location.pathname).title}
                            </NavBar>
                            {
                                this.renderContent(item.path)
                            }
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default Dashboard;