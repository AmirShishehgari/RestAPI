var express = require("express");
var request = require('request');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'))
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
var users = [];
app.get('/users', function (req, res) {;
    request.get({
        url: 'https://jsonplaceholder.typicode.com/users/',
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
        var response = JSON.parse(body)
        users = response
        res.json(response);
    });
})
app.post('/add-user', function (req, res) {
    var name = req.body.name
    if(!isNaN(name)){
            return res.status(400).json({message: 'This username is invalid'})
    }
    users.forEach((value)=>{
        if(value.name.toLowerCase() == name.toLowerCase())
            return res.status(400).json({message: 'Username already exists'})
    })
    console.log(name)
    users.push({id:users.length+1,name:name,username:name,email:`${name}@gmail.com`})
    res.json(users);
})
app.put('/edit-user', function (req, res) {
    var id = req.body.id
    var index = id -1
    id = parseInt(id)
    index = parseInt(index)
    var name = req.body.name
    if(!isNaN(name)){
        return res.status(400).json({message: 'This username is invalid'})
    }
    users[index] = {id:id,name:name,username:name,email:`${name}@gmail.com`}
    res.json(users);
})

app.delete('/delete-user', function (req, res) {
    var id = req.body.id
    var idList = []
    users.map((value, key)=>{
        idList.push(value.id)
        if(users.length == key + 1){
            if(idList.indexOf(parseInt(id)) == -1)
            {
                return res.status(400).json({message: 'This id  doesn\'t exist'})
            }
            for( var i = 0; i < users.length; i++)
            {
                console.log(users[i].id)
                if ( users[i].id == id)
            {
                users.splice(i, 1);
                res.json(users);
            }
            }

        }
    })
})

