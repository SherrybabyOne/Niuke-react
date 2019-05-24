import React,{Component} from 'react';
import { InputItem,List,NavBar,Icon,Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList,sendMsg,recvMsg } from './store/actionCreators';
import { getChatId } from './../../utils/utils';
import './index.less';
const ListItem = List.Item;

@connect(
    ({chatUser})=>({chatUser}),
    { getMsgList,sendMsg,recvMsg }
)
class Chat extends Component{

    constructor(props){
        super(props);
        this.state={
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    componentDidMount(){
        if(!this.props.chatUser.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    handleSubmit(){
        const from = (JSON.parse(localStorage.getItem('userInfo')))._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg(from,to,msg);
        this.setState({
            text: ''
        })
        this.props.getMsgList();
    }

    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                        .split(' ')
                        .filter(v=>v)
                        .map(v=>({text:v}))
        const userId = this.props.match.params.user;
        const users = this.props.chatUser.users;
        if(!users[userId]){
            return null;
        }
        const chatId =  getChatId(userId,JSON.parse(localStorage.getItem('userInfo'))._id)
        const chatmsgs = this.props.chatUser.chatmsg.filter(v=>v.chatId===chatId)
        return(
            <div className='chat-page'>
                <NavBar
                    mode='dark'
                    style={{width:'100%'}} 
                    icon={<Icon type='left' />}
                    leftContent='返回'
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userId].name}
                </NavBar>
                <div className='stick-content'>
                    {chatmsgs.map(v=>{
                        const avatar = require(`./../../assets/img/${users[v.from].avatar}.png`)
                        return v.from===userId?(
                            <List key={v._id}>
                                <ListItem thumb={avatar} >{v.content}</ListItem>
                            </List>
                        ):(
                            <List key={v._id}>
                                <ListItem
                                    extra={<img src={avatar} alt='' />}
                                    className='chat-me'
                                >{v.content}</ListItem>
                            </List>
                        )
                    })}
                </div>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入信息'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                        style={{matginRight:'15px'}}
                                        role='img'
                                    >😀</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {
                        this.state.showEmoji?
                            <Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(elm)=>{
                                    this.setState({
                                        text: this.state.text + elm.text
                                    })
                                }}
                            />
                        :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default Chat;