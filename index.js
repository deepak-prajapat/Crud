var express=require('express')
var app= express()
var mysql= require('mysql');
var bodyparser=require ('body-parser');
const bodyParser = require('body-parser');



app.use (bodyparser.urlencoded({extended:true}));
app.use (bodyParser.json() ); 

app.set('view engine','ejs');
app.set('view engine','hbs');


 
//Creat Connection 

var conn=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database : 'node'

});


// connect to mysql

conn.connect(function(err){
    
    if (err) throw err;

    console.log("connection sucessfull...")

});

app.get('/',function(req,res){
    res.render('insert');

});

////
app.post('/insert',function(req,res){
        var name=req.body.name;
        var email=req.body.email;
        var paasword=req.body.paasword;

        var sql ='insert into  user (user_name,user_email,user_password) value('${ name}','${email},'${paasword}')';

         conn.query(sql,function(err,results){
            if(err) throw err;
            res.send("<h1> data send .....</h1>")
         });
    });

 
 
 ///
    app.get('/show',function(req,res){
            var sql="select * from user";

            conn. query(sql,function(err,results){
                if(err) throw err;
                res.render('show',{user:results});
            });
    });


 ///   
    app.get('/delete/:id',function(req,res){
        var id=req.params.id;
        var sql='delete from users where user_id='${id}'';

        conn. query(sql,function(err,results){
            if(err) throw err;
            res.redirect('show')
        });
});




app.get('/',function(req,res){
    res.render('/insert');
});




var server= app.listen(4000,function(){

    console.log("App running On 4000...");

});

