var express = require('express')
var bodyParser = require('body-parser');

var server = express()
server.use(express.json())
server.use(express.static(__dirname + '/public'))
server.use(bodyParser.urlencoded({ extended: true }));
 
var posts = [{
    id: 1,
    title: "Ice Cream Cakes",
    content: "I love ice cream."
}, 
{
    id:2, 
    title:"Is everything technically a soup or a Salad?",
    content: "what about pizza?",
}]

server.get('/api/post' , function(request, response, next){
    response.json(posts)
})

server.post('/api/post', function(request, response, next){
    // get the next available ID by adding one to the highest value found
    var id = 0
    posts.forEach(element => {
        if (element.id > id) {
            id = element.id
        }
    });
    id++
    // create a new post object
    let post = {
        id: id,
        title: request.body.title,
        content: request.body.content
    }
    // push that post onto the posts array
    posts.push(post)
    // return the post we just created
    response.json(post)
})

server.listen(3000, function(){
    console.log('listening in port 3000')
})