const express = require ('express')
const fs = require ('fs')
const path = require ('path')
const router = express.Router()

function ReadData ( filePath ) {
    const fullPath = path.join( __dirname , '../' , filePath )
    const Data = fs.readFileSync(fullPath)
    return JSON.parse(Data)
}

function WriteData ( filePath , Data ) {
    const fullPath = path.join( __dirname , '../' , filePath )
    fs.writeFileSync(fullPath , JSON.stringify(Data , null , 2))
}

router.get('/posts', (req,res)=>{
    const posts = ReadData( 'data.json' )
    res.json(posts)
})

router.get('/posts/:id', (req,res)=>{
    const posts = ReadData( 'data.json' )
    const post = posts[req.params.id - 1]
    res.json(post)
})

router.post('/posts', (req,res)=>{
    const posts = ReadData( 'data.json' )
    const newPost = {
        id : posts.length + 1 ,
        title : req.body.title,
        author : req.body.author,
        desc : req.body.desc,
        date : new Date().toString()
    }
    posts.push(newPost)
    res.json(newPost)
})

router.post('/posts', (req,res)=>{
    const posts = ReadData( 'data.json' )
    const newPost = {
        id : posts.length + 1 ,
        title : req.body.title,
        author : req.body.author,
        desc : req.body.desc,
        date : new Date().toString()
    }
    posts.push(newPost)
    WriteData( 'data.json' , posts )
    res.status(200).json(newPost)
})

router.put('/posts/:id' , (req,res)=>{
    const posts = ReadData( 'data.json' )
    const post = posts[req.params.id - 1]
    if ( post ) {
        post.title = req.body.title || post.title ,
        post.author = req.body.author || post.author ,
        post.desc = req.body.desc || post.desc ,
        post.date = new Date().toString()
        WriteData( ' data.json ' , posts )
        res.json( post )
    }
    else {
        res.status(404).send('post not found')
    }
})

router.delete('/posts/:id', (req,res)=>{
    const posts = ReadData( 'data.json' )
    if ( posts[req.params.id - 1] ) {
        posts.splice(req.params.id - 1 , 1)
        WriteData( ' data.json ' , posts )
        res.status(200).send('post deleted correctly')
    }
    else {
        res.status(404).send('post not found')
    }
})

module.exports = router