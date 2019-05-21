import React,{Component} from 'react';
import { TabBar,NavBar } from 'antd-mobile';
import Boss from './../../components/boss/index'

function Genius(){
    return (
        <h2>Genius首页</h2>
    )
}
function Msg(){
    return (
        <h2>消息首页</h2>
    )
}
function User(){
    return (
        <h2>个人中心</h2>
    )
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
export default class Dashboard extends Component{

    renderContent(pathname) {
        switch(pathname){
          case '/boss': 
            return <Boss />
          case '/msg':
            return <Msg />
          case '/me':
            return <User />
          default:
            return null
        }
    }

    render(){
        const list = navList.filter(v=>(!v.hide))
        const { pathname } = this.props.location;
        return(
            <div style={{height:'100vh'}}>
                <TabBar tabBarPosition='bottom'>
                    {list.map(item=>(
                        <TabBar.Item
                            key={item.path}
                            title={item.title}
                            icon={{uri:require(`./../../assets/${item.icon}.png`)}}
                            selectedIcon={{uri:require(`./../../assets/${item.icon}-active.png`)}}
                            selected={pathname===item.path}
                            onPress={()=>{
                                this.props.history.push(item.path)
                            }}
                        >
                            <NavBar mode='dark'>
                                {navList.find(v=>v.path===this.props.location.pathname).title}
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