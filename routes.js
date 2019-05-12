const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const config = require('./config');

// connect to mysql
var pool = mysql.createPool(config.mysql);

// all the routes
router.get("/",function(req,res){
    res.json({"Message" : "Hello World !"});
});

router.get("/users",function(req,res){
    var query = "SELECT * FROM ??";
    let table = ["user_login"];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "Success", "Users" : rows});
    });
});

router.get("/users/:user_id",function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["user_login","user_id",req.params.user_id];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "Success", "Users" : rows});
    });
});

router.post("/users",function(req,res){
    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = ["user_login","user_email","user_password",req.body.email,bcrypt.hashSync(req.body.password, 10)];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "User Added !"});
    });
});

router.put("/users",function(req,res){
    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    var table = ["user_login","user_password",bcrypt.hashSync(req.body.password, 10),"user_email",req.body.email];
    query = mysql.format(query,table);
    pool.query(query, (err,result) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
    });
});

router.delete("/users/:email",function(req,res){
    var query = "DELETE from ?? WHERE ??=?";
    var table = ["user_login","user_email",req.params.email];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
    });
}); 

module.exports = router;
