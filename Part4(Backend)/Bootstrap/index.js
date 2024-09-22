const express = require('express')
const app = express()
const port = 3007
app.set('view engine', 'ejs')
app.get('/', (req, res)=>{
    let sitename = 'New Site'
    let searchtext = 'Search Text'
    let arr = [1,3,5]
    res.render('index', {sitename: sitename, searchtext: searchtext, arr})
})

app.get('/blog/:slug', (req, res)=>{
    let blogtitle = 'New Blog'
    let blogcontent = 'Blog Content'
    res.render('blogpost', {blogtitle: blogtitle, blogcontent: blogcontent})
})

app.listen(port, () =>{
    console.log(`Example port listening on port ${port}`);
})