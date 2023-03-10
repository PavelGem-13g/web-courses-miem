const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const database = require('./database.js');

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/", function(request, response){
    //database.createEmptyCollection();
    response.render("pages/index")
});

app.post("/send",function(request, response){
    console.log(request.body);
    database.createUser(request.body);
    database.getId(request.body).then(function (id) {
        response.redirect("/get/"+id);
    })
});

app.get("/get/:id", function(request, response){
    database.getUser(request.params.id).then(function(res){
        console.log(res);
        response.render("pages/info", res)
    });
});

app.listen(3000, ()=>console.log("Start server"))