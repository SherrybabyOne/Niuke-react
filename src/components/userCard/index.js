import React,{Component} from 'react';
import { WingBlank,Card,WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class UserCard extends Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render(){
        return(
            <div>
                <WingBlank>
                    {this.props.userList.map(v=>(
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
                                    {v.type==='boss'?<div>公司:{v.company}</div>:null}
                                    {v.desc.split('\n').map(item=>(
                                        <div key={item}>{item}</div>
                                    ))}
                                    {v.type==='boss'?<div>薪资:{v.money}</div>:null}
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