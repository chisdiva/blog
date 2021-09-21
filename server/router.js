
const express = require('express')
const crud = require('./crud')
const fs = require('fs')
//创建路由容器
const router = express.Router()

const crypto = require('crypto')

const myBlog = crud.myBlog
const myCollect = crud.myCollect;
const myEssay = crud.myEssay;
const blogUsers = crud.blogUsers

const jwtUtil = require('./jwt')

const multer = require('multer')

//读取全部文章
router.get('/blog', function (req, res) {

    myBlog.find((err, data) => {
      if(err) {
         return res.send(err)
      }
      res.send(data)
    })
})

router.get('/essay', function (req, res) {
    myEssay.find((err, data) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        console.log(data)
        res.send(data)
    })
})

router.get('/collect', function (req, res) {
    myCollect.find((err, data) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        console.log(data)
        res.send(data)

    })
})


//创建新文章
router.post('/blog/new', (req, res) => {
    //创建一个实例，调用save存到数据库
    new myBlog(req.body).save((err, data) => {
        if(err) {
            return res.send(err)
        }
        res.send(data)
    })
})
router.post('/essay/new', (req, res) => {
    //创建一个实例，调用save存到数据库
    new myEssay(req.body).save((err, data) => {
        if(err) {
            return res.send(err)
        }
        res.send(data)
    })
})
router.post('/collect/new', (req, res) => {
    //创建一个实例，调用save存到数据库
    new myCollect(req.body).save((err, data) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        console.log(data)
        res.send(data)
    })
})

//根据id获取文章
router.get('/blog/:id', function (req, res) {
    myBlog.findById(req.params.id, function (err, data) {
        if(err) {
            return res.send(err)
        }else {
            res.send(data)
        }
    })
})
router.get('/essay/:id', function (req, res) {
    myEssay.findById(req.params.id, function (err, data) {
        if(err) {
            return res.send(err)
        }else {
            res.send(data)
        }
    })
})
router.get('/collect/:id', function (req, res) {
    myCollect.findById(req.params.id, function (err, data) {
        if(err) {
            return res.send(err)
        }else {
            res.send(data)
        }
    })
})

//修改数据
router.post('/blog/:id', (req, res) => {
    myBlog.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        comments: req.body.comments
    }, function (err, data) {
        if(err) {
            return res.send(err)
        }
        res.send(data)
    })
})
router.post('/essay/:id', (req, res) => {
    myEssay.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        comments: req.body.comments
    }, function (err, data) {
        if(err) {
            return res.send(err)
        }
        res.send(data)
    })
})
router.post('/collect/:id', (req, res) => {
    myCollect.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        link: req.body.content,
        date: req.body.date,
    }, function (err, data) {
        if(err) {
            return res.send(err)
        }
        res.send(data)
    })
})

//删除数据
router.delete('/blog/:id', (req, res) => {
    myBlog.findByIdAndDelete(req.params.id, function (err) {
        if(err) {
            return res.send(err)
        }
        res.send('删除成功')
    })
})
router.delete('/essay/:id', (req, res) => {
    myEssay.findByIdAndDelete(req.params.id, function (err) {
        if(err) {
            return res.send(err)
        }
        res.send('删除成功')
    })
})
router.delete('/collect/:id', (req, res) => {
    myCollect.findByIdAndDelete(req.params.id, function (err) {
        if(err) {
            return res.send(err)
        }
        res.send('删除成功')
    })
})

//登陆
router.post('/login', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    return new Promise((resolve, reject) => {
        //在集合中查找该用户名
        blogUsers.findOne({"userName": userName}, function(err, data) {
            if(err) {
                reject(err);
            }
            else resolve(data)
        })
    }).then(result => {
        if(result) {
            //验证密码，生成token并发送
            if(result.password === password) {
                let jwt = new jwtUtil(result);
                let token = jwt.generateToken();
                res.send({status:200, msg: '登陆成功', token: token})
            }
            else {
                res.send({status:400, msg:'密码错误'})
            }
        }
        else {
            res.send({status:404,msg:'账号不存在'})
        }
    }).catch(err => {
        res.send({status: 500, msg: '查找失败'})
    })
})



//图片上传
router.post('/upload', multer({
        dest:'uploads'
    }).array('file',10),(req,res)=>{
        const files = req.files;
        const fileList = [];
        for(let i in files){
            let file = files[i];
            fs.renameSync(file.path,`uploads/${file.originalname}`);
            file.path = `uploads/${file.originalname}`;
            fileList.push(file)
        }
        res.send(fileList)
    }
);
module.exports = router