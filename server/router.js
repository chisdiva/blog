
const express = require('express')
const crud = require('./crud')
//创建路由容器
const router = express.Router()

const myBlog = crud.myBlog
const myCollect = crud.myCollect;
const myEssay = crud.myEssay;


//读取全部文章
router.get('/blog', function (req, res) {
    myBlog.find((err, data) => {
      if(err) {
          console.log(err)
         return res.send(err)
      }
        console.log(data)
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

module.exports = router