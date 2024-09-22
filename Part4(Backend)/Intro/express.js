const express = require('express')
const fs = require('fs')
const app = express()
const port = 3006
const blog = require('./routes/blog')

app.use(express.static('public'))
app.use('/blog',blog)

//middleware1
app.use((req, res, next)=>{
    console.log('m1');
    console.log(Date.now(), req.method);
    console.log(req.headers);
    req.test = 'This is a test'
    fs.appendFileSync('logs.txt',`${Date.now()} ${req.method}\n`);
    next()
})
app.use((req, res, next)=>{
    console.log('m2');
    next()
})

app.get('/', (req, res)=>{
    res.send('Hello World'+' '+req.test)
}).post('/', (req, res)=>{
    res.send('Post Request')
}).put('/', (req, res)=>{
    res.send('Put Request')
})


app.get('/about', (req, res)=>{
    res.send('Hello About')
})
app.get('/contact', (req, res)=>{
    res.send('Hello Contact')
})
app.get('/hello/:slug', (req, res)=>{
    res.send(`Hello Blog ${req.params.slug}`)
    console.log(req.params);
    console.log(req.query);
})


app.get('/index', (req, res)=>{
    res.sendFile('templates/index.html', {root: __dirname})
    console.log(__dirname);
})
app.get('/api', (req, res)=>{
    res.json({a:1, b:2, c:3, d:4, name:["Lola", 'Jerry']})
})



app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})