const express = require ('express')

const app = express()
const PORT = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', require('./routes/posts'))

app.listen(PORT , ()=>{
    console.log(`server is running on port : ${PORT}`)
})
