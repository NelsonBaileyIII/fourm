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
    console.log(request.body)
    response.json(request.body)
})

server.listen(3000, function(){
    console.log('listening in port 3000')
})