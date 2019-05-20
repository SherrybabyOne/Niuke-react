import React,{Component} from 'react';
import { createForm } from 'rc-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { List,InputItem,Radio,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import Logo from './../../components/logo'
import * as utils from './../../utils/utils';
const RadioItem = Radio.RadioItem;

@createForm()
class Login extends Component{

    constructor(props){
        super(props);
        this.state= {
            type: 'genius',  //或者boss
            redirectTo: '',
            msg: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(){
        const userInfo = this.props.form.getFieldsValue();
        userInfo.type = this.state.type;
        const {user,pwd,repeatPwd,type} = userInfo;
        if(!user||!pwd||!repeatPwd){
            return this.setState({
                msg: '用户名及密码必须输入'
            })
        }
        if(pwd!==repeatPwd){
            return this.setState({
                msg: '两次密码输入不一致'
            })
        }
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status===200){
                    localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                    this.setState({
                        redirectTo: utils.getRedirectPath(userInfo),
                        msg: res.data.msg
                    })
                }
            })
    }
    handleChange(type){
        this.setState({
            type: type
        })
    }

    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div>
                {this.state.redirectTo?<Redirect to={this.state.redirectTo} />:null}
                <Logo />
                <WingBlank>
                    <h2>注册页面</h2>
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
                        <InputItem
                            {...getFieldProps('repeatPwd')}
                            placeholder='请重新输入密码'
                            type='password'
                        >确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type==='genius'}
                            onChange={()=>this.handleChange('genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type==='boss'}
                            onChange={()=>this.handleChange('boss')}
                        >
                            BOSS
                        </RadioItem>
                        {this.state.msg?<p style={{color:'red'}}>{this.state.msg}</p>:null}
                        <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login;