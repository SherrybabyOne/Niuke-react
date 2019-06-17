import React,{Component} from 'react';
import { Result,List,WhiteSpace,Button,Modal } from 'antd-mobile';
const ListItem = List.Item;
const Brief = ListItem.Brief;

class User extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(){
        // localStorage.removeItem('userInfo')
        Modal.alert('注销','确认退出吗?',[
            { text:'取消' },
            { text:'确认',onPress: () => {
                localStorage.removeItem('userInfo');
                // window.location.href = window.location.href;
                window.location.href = '/login'
            }}
        ])
    }

    render(){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        return userInfo?
            <div>
                <Result
                    img={<img src={require(`./../../assets/img/${userInfo.avatar}.png`)} style={{width:50}} alt='' />}
                    title={userInfo.user}
                    message={userInfo.type==='boss'?userInfo.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <ListItem>
                        {userInfo.title}
                        {userInfo.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {userInfo.money?<Brief>{userInfo.money}</Brief>:null}
                    </ListItem>
                </List>
                <WhiteSpace />
                <List>
                    <Button onClick={this.handleLogout}>退出登录</Button>
                </List>
            </div>
            :
            null
    }
}

export default User;