function REST_ROUTER(router,connection) {
    var self = this;
    self.handle_routes(router,connection);
}

REST_ROUTER.prototype.handle_routes = function(router,connection) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.post("/login",function(req,res){
        connection.query("SELECT * FROM user_login WHERE user_email='"+req.body.email+"'",function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                if(rows.length === 1) {
                    res.json({"Error" : false, "Message" : "Login Success !"});
                } else if(rows.length === 0){
                    res.json({"Error" : true, "Message" : "No such user exists"});
                } else {
                    res.json({"Error" : false, "Message" : "Login failed."});
                }
            }
        });
    });

    router.post("/Signup",function(req,res){
        connection.query("INSERT INTO user_login(`user_email`,`user_password`) VALUES ('"+req.body.email+"','"+req.body.password+"')",function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.get("/GetAllUsers/:user_id",function(req,res){
        var condition = "";
        condition+=" WHERE user_id="+req.params.user_id;
        connection.query("SELECT * FROM user_login"+condition,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/GetAllUsers",function(req,res){
        connection.query("SELECT * FROM user_login",function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.put("/UpdatePassword",function(req,res){
        var query = "UPDATE `user_login` SET `user_password`='"+req.body.password+"' WHERE `user_email`='"+req.body.email+"'";
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the name for email "+req.body.email});
            }
        });
    });

    router.delete("/DeleteUser/:email",function(req,res){
        var query = "DELETE from `user_login` WHERE `user_email`='"+req.params.email+"'";
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.body.email});
            }
        });
    });
}

module.exports = REST_ROUTER;
