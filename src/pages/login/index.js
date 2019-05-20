import React,{Component} from 'react';
import { createForm } from 'rc-form';
import axios from 'axios';
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import * as utils from './../../utils/utils';
import Logo from './../../components/logo'

@createForm()
class Login extends Component{

    constructor(props){
        super(props);
        this.state= {
            msg: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister =this.handleRegister.bind(this);
    }

    handleRegister(){
        this.props.history.push('/register')
    }
    handleLogin(){ 
        let {user,pwd} = this.props.form.getFieldsValue();
        if(!user||!pwd){
            return this.setState({
                msg: '用户名及密码必须输入'
            })
        }
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status===200){
                    if(res.data.code===1){
                        this.setState({
                            msg: res.data.msg
                        })
                    }else if(res.data.code===0){
                        localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                        this.props.history.push(utils.getRedirectPath(res.data.data));
                    }
                }
            })
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <Logo />
                <WingBlank>
                    <h2>登陆页面</h2>
                    <List>
                        <InputItem
                            {...getFieldProps('user')}
                            placeholder='请输入用户名'
                        >用户名</InputItem>
                        <InputItem
                            {...getFieldProps('pwd')}
                            placeholder='请输入密码'
                            type='password'
                        >密码</InputItem>
                        <WhiteSpace />
                        {this.state.msg?<p style={{color:'red'}}>{this.state.msg}</p>:null}
                        <Button type='primary' size='small' onClick={this.handleLogin}>登录</Button>
                        <WhiteSpace />
                        <Button type='primary' size='small' onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login;