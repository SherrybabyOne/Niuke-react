const express = require('express');
const utils = require('utility')
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat')
const _filter = {'pwd': 0,'__v': 0}

Router.get('/list',function(req,res){
    // User.remove({},function(err,doc){})
    const { type } = req.query;
    User.find({type},function(err,doc){
        if(!err){
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        // res.cookie('userId',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body;
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'后端出错'})
            }
            const { user,type,_id } = doc;
            // res.cookie('userId',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})
Router.post('/readmsg',function(req,res){
    const {_id,from} = req.body;
    console.log(_id,from)
    Chat.update({from,to:_id},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
        console.log(doc)
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
Router.post('/update',function(req,res){
    const {_id} = req.body
    User.find({_id},function(err,doc){
        if(!doc){
            return res.json({code:1})
        }
        const body = req.body;
        User.findByIdAndUpdate(_id,body,function(err,doc){
            const data = Object.assign({},{
                user: doc.user,
                type: doc.type
            },body)
            return res.json({code:0,data})
        })
    })
})
Router.get('/getmsglist',function(req,res){
    const _id = req.query._id;
    User.find({},function(err,doc){
        let users = {};
        doc.forEach(v=>{
            users[v._id] = {name: v.user,avatar: v.avatar}
        })
        Chat.find({'$or':[{from:_id},{to:_id}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})
Router.get('/a',function(req,res){
    // Chat.remove({},function(err,doc){})
    Chat.find({},function(err,doc){
        if(!err){
            res.json(doc)
        }
    })
})
// Router.get('/info',function(req,res){
//     const { userId } = req.cookies;
//     if(!userId){
//         return res.json({code: 1})  
//     }
//     User.findOne({_id:userId},_filter,function(err,doc){
//         if(err){
//             return res.json({code:1,msg:'后端出错'})
//         }
//         if(doc){
//             return res.json({code:0,data:doc})
//         }
//     })
// })

function md5Pwd(pwd){
    const salt = 'imooc_is_good_1234124124124141@$!~#'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;