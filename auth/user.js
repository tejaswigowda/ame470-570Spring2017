var auth = require('./authenticate.js');

function addUser(req, res, userType, approvedUsers, db){
		auth.restrict(req, res, db, approvedUsers, function(ret){	
            if(ret == true){
					db.collection("users").findOne({userID:info.userID}, function(err, result) {
						if(result) { 
							res.send('0');
						} else {
							db.collection("users").insert(info, function(err, result) {
								if (err) throw err;
								if (result) {
									res.send('1');
								}
							});
						}
			  });
			} else {
				res.send('You do not have the proper permissions');
			}
		});
}

function getUser(req, res, userType, approvedUsers, db){
	if(req.method == 'GET'){
		auth.restrict(req, res, db, approvedUsers, function(ret){	
			if(ret==true){		
					db.collection("users").findOne({userID: info.userID}, function(err, result) {
					if(result) {
                            //res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                            var output = JSON.stringify(result);
                            res.write(output);
                            res.end();
					}
                    else{
                        res.send('0');
                    }
				    });
			}
			else {
				res.send('noauth');
				res.end();
			}
		});
}

function deleteUser(req, res, userType, approvedUsers, db){
		auth.restrict(req, res, db, approvedUsers, function(ret){	
			if(ret==true){
				var info = req.query;
                db.collection("users").remove({userID:info.userID, userType: userType}, function(err, result) {
                    if (err) throw err;
                    else{
                        res.send('1');
                    }
                });
			}else {
				res.send('improper credentails');
			}
		});
}

function changeUserPassword(req, res, userType, approvedUsers, db){
		auth.restrict(req, res, db, approvedUsers, function(ret){
			if(ret==true){
				var info = req.query;

					db.collection("users").update({userID:info.userID, userType: userType, password:info.oldPassword}, {'$set':{password:info.newPassword}}, function(err) {
						if (!err) {
							res.send('1');

						} else {				
							res.send('0');							
						}		
					});

			}else {
				res.send('improper credentails');
			}
		});
	
}

function editUser(req, res, userType, approvedUsers, db){
        auth.restrict(req, res, db, approvedUsers, function(ret){       
        if(ret==true){          
          var info = req.query;
          db.collection("users").findOne({loc:info.loc, userType: userType, userID:info.userID}, function(err, result) {
            if (!err){
                info["_id"] = result._id;
                var temp = Object.keys(info);
                var key;
                var temp = Object.keys(info);
                for(var t = 0; t <  temp.length; t++){
                    key = temp[t];
                    result[key] = info[key];  
                }
            }
        });
                                                                  
        } else{
                res.send('You do not have the proper permissions');
                res.end();
        }
        });
}

exports.add = addUser;
exports.get = getUser;
exports.getAll = getAllUsers;
exports.destroy = deleteUser;
exports.changePassword = changeUserPassword;
exports.edit = editUser;
