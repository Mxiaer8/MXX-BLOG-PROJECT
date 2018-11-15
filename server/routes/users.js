var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('respond with a resource');
});

router.post('/login', function(req, res, next) {
    var parm = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
   // console.log(parm);
    Users.findOne(parm, function (err, doc) {
        // console.log("test")
        if(err) {
            // console.log("error!")
            res.json({
                status: '1',
                msg: err.message
            })
        } else if(doc) {
            res.json({
                status: '0',
                msg: '',
                result: {
                    userName: doc.userName
                }
            })
        } else {
            res.json({
                status: '-1',
                msg: ''
            })
        }
    })
    //res.json('respond with 2 resource');
});
module.exports = router;
