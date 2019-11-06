var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var cons= require('consolidate');
var dust = require('dustjs-helpers');
var pg =require('pg');
var app = express();
          //database connection
          var  Pool, Client  = require('pg');
          var connectionString = "postgres://admin:5463jeny@localhost:5432/teamwork";
          app.engine('dust',cons.dust);
          //asign dust engine 
          app.set('view engine','dust');
          //you have to enclose the dust engine in ''
          app.set('views',__dirname +'/views');
          //set public folder
          app.use(express.static(path.join(__dirname, 'public')));
//body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.get('/',function(req,res){
    
      
      var client = new Client({
        connectionString: connectionString,
      })
      client.connect()
      client.query('SELECT *FROM admin', ( err, result ) => {
        console.log(err, result)
          res.render('index',{admin:result.rows});
     
        client.end();
      });




});


app.post('/add',function(req,res){
    const client = new Client({
      connectionString: connectionString,
    });
    client.connect();
    client.query('INSERT INTO admin(id ,username, email, password) VALUES($1,$2,$3,$4) RETURNING *',[req.body.id, req.body.username, req.body.email,req.body.password]);
    
    client
    .query(1)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
    client.end();
    res.redirect('/');
   });
   
  
 
app.listen(3000,function(){
    console.log("port is running on 3000")
})

          