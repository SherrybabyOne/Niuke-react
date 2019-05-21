import React,{Component} from 'react';
import { NavBar,InputItem,List,TextareaItem,WingBlank,WhiteSpace,Button,Grid } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

@createForm()
class GeniusInfo extends Component{

    constructor(props){
        super(props);
        this.state= {
            icon: '',
            text: '',
            redirectTo: ''
        }
        this.handleUpdate =this.handleUpdate.bind(this);
    }

    handleUpdate(){
        const bossInfo = this.props.form.getFieldsValue();
        const {text} = this.state;
        bossInfo.avatar = text;
        const {_id} = JSON.parse(localStorage.getItem('userInfo'))
        axios.post('/user/update',{...bossInfo,_id})
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    const userInfo = res.data.data;
                    localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    this.setState({
                        redirectTo: '/genius'
                    })
                }
            })
    }

    render(){
        const { getFieldProps } = this.props.form;
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(item=>({
                icon: require(`./../../assets/img/${item}.png`),
                text: item
            }))
        const gridHeader = this.state.text?
            (<div>
                <span>已选择头像</span>
                <img src={this.state.icon} alt='' />
            </div>)
            : '请选择头像:';
        return(
            <div>
                {this.state.redirectTo?<Redirect to={this.state.redirectTo} />:null}
                <NavBar mode='dark'>牛人信息完善页面</NavBar>
                <WhiteSpace />
                <List renderHeader={gridHeader}>
                    <Grid
                        data={avatarList}
                        onClick={elm=>{
                            this.setState(elm)
                        }}
                    />
                </List>
                <WingBlank>
                    <List>
                        <InputItem
                            {...getFieldProps('title')}
                        >求职岗位</InputItem>
                        <TextareaItem
                            {...getFieldProps('desc')}
                            title="个人简介"
                            autoHeight
                            rows={3}
                        />
                        <Button
                            type='primary'
                            onClick={this.handleUpdate}
                        >保存信息</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo;