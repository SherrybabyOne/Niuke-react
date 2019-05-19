import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { actionCreators } from './store';

class Home extends Component{

    render(){
        const { num } = this.props.header;
        const { addGun,removeGun,addGunAsync } = this.props;
        return(
            <div>
                <h1>当前武器库数量：{num}</h1>
                <Button onClick={addGun} type='primary'>增加武器</Button>
                <Button onClick={removeGun}>减少武器</Button>
                <Button onClick={addGunAsync}>拖两天再给</Button>
            </div>
        )
    }
}


const mapStateToProps = (state)=> ({
    header: state.header
})
const mapDispatchToProps = dispatch=>({
    addGun(){
        dispatch(actionCreators.addGun())
    },
    removeGun(){
        dispatch(actionCreators.removeGun())
    },
    addGunAsync(){
        dispatch(actionCreators.addGunAsync())
    }
})
Home = connect(mapStateToProps,mapDispatchToProps)(Home);
export default Home;