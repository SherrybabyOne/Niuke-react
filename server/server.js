import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
import path from 'path'

// import staticPath from './../build/asset-manifest.json'
import csshook from 'css-modules-require-hook/preset'
// import routes from '/shared/views/routes'
import assethook from 'asset-require-hook'
assethook({
  extensions:['png'],
  //图片大小下于10000的图片会直接base64编码
  limit: 10000
})
import React from 'react'
import { Provider } from 'react-redux'
import store from './../src/store'
import { StaticRouter } from 'react-router-dom'
import App from './../src/App'
import Router from './../src/router'
import {renderToString,renderToStaticMarkup,renderToNodeStream} from 'react-dom/server'
// React->div

const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

const Chat = model.getModel('chat')
io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        const { from,to,msg} =data;
        const chatId =[from,to].sort().join('_');
        Chat.create({chatId,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

const userRouter = require('./user')

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next() 
    }
    let context = {}
    const markup = renderToString(
        <Provider store={store}>
            <Router>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <App />
                </StaticRouter>
            </Router>
        </Provider>
    )
    const htmlRes = renderToString(<App />)
    // const htmlRes = renderToString(<App />)
    res.send(htmlRes)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
    console.log('Node app start at port 9093')
})