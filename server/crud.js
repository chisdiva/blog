//引入mongoose，连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mblog')
mongoose.connection.once("open", function () {
    console.log('11')
})
//db.on('error', console.error.bind(console, 'connection error:'));

//设计集合结构schema，也就是约束

//设计数据库的数据结构
const myBlog = mongoose.model('myBlog', {
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    comments:{
        type: Array
    }
})

const myEssay = mongoose.model('myEssay', {
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    comments:{
        type: Array
    }
})

const myCollect = mongoose.model('myCollect', {
    title:{
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true
    },
})

const blogUsers = mongoose.model('blogUsers', {
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user', {
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = {
    myBlog: myBlog,
    myEssay: myEssay,
    myCollect: myCollect,
    blogUsers: blogUsers
}