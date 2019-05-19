import React,{Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

@withRouter
class App extends Component{

  componentDidMount(){
    if(!localStorage.getItem('userInfo')){
      this.props.history.push('/login')
    }
    // axios.get('/user/info')
    //   .then(res=>{
    //     if(res.status===200){
    //       if(res.data.code===0){
    //         //有登录信息
    //       }else{
    //         this.props.history.push('/login')
    //       }
    //     }
    //   })
  }
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default App