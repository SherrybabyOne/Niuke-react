//高阶组件
import React from 'react';

export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        
        render(){
            return <Comp {...this.props} ></Comp>
        }
    }
}