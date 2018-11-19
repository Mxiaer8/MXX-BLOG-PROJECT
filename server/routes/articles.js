var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = require('../models/articles');

//连接数据库
mongoose.connect('mongodb:/127.0.0.1:27017/blog');

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected")
});

//获取文章列表
router.get("/",function (req, res, next) {
   Articles.find({},function (err, doc) {
       if(err) {
           res.json({
              status: '1',
              msg: err.message
           });
       } else {
          var recentList = []
           if(doc.length > 5) {
               for(var i = 0; i < 5; i++) {
                   recentList.push(doc[i])
               }
           } else recentList = doc
           res.json({
               status: '0',
               msg: '',
               result: {
                   count:'',
                   list: doc,
                   recentList: recentList
               }
           })
       }
   })
});

//根据_id获取某一篇文章
router.post("/findOneArticle",function (req, res, next) {
   // console.log(req.body.articles_Id)
    var parm = {"_id": req.body.articles_Id}
    // console.log(parm)
    Articles.findOne(parm, function (err, doc) {
        if(err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else if(doc) {
            res.json({
                status: "0",
                msg: "",
                result: {
                    list: doc
                }
            })
        } else {
            res.json({
                status: "-1",
                msg: ""
            })
        }
    })
})

//模糊查询某一篇文章
router.post('/findLikesArticles',function (req, res, next) {
   var parm  = {}
   parm['articlesName'] = new RegExp(req.body.likes)
    Articles.findOne(parm, function (err, doc) {
        if(err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else if(doc) {
            res.json({
                status: "0",
                msg: "",
                result: {
                    list: doc
                }
            })
        } else {
            res.json({
                status: "-1",
                msg: ""
            })
        }
    })
})


//编辑文章
router.post('/editArticle', function (req, res, next) {
    // console.log(req.body.articlesText)
    var parm = {
        "articlesText" : req.body.articlesText,
        "articlesName": req.body. articlesName,
        "articlesTime": req.body.articlesTime,
        "articlesRead": 0,
        "articlesPoint": 0
    }
    Articles.create(parm, function (err, doc) {
        if(err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: '',
                result: 'success'
            })
        }
    })
})

//删除文章
router.post('/deleteArticle', function (req, res, next) {
   //  console.log(req.body.articlesId)
    var parm = {"_id": req.body.articlesId}
    Articles.remove(parm, function (err, doc) {
        if(err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: '',
                result: 'success'
            })
        }
    })
})

//阅读文章的人数+1
router.post("/hasRead",function (req, res, next) {
   console.log(req.body.articles_Read)
    Articles.update({"_id":req.body.articles_Id }, {$set: {"articlesRead": req.body.articles_Read}}, function (err) {
        if(err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: "success"
            })
        }
    })
})

module.exports = router;
