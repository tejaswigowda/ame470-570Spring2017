
function authenticate(name, pass, collection, userType, db, fn) {
	console.log('userID: '+ name +' password: '+ pass + " collection: " + collection + ' userType: ' + userType +' accepted to authenticate');
	db.collection(collection).findOne({userID:name, password:pass, userType:userType}, function(err, user) {
		if (err) {
			return fn(err);
		}
		
		if(user) {
			return fn(null, user);

		}else{
			return fn(null, null);
		}
	});
}


function restrict(req, res, db, approvedUsers, fn) {
	var ret;
  console.log(req.session);
	if(req.session.collection != null){
		db.collection(req.session.collection).findOne({userID:req.session.userID}, function(err, result) {
      console.log(result);
			if(result) { 
				if (result.userID == req.session.userID && result.password == req.session.password && approvedUsers.indexOf(req.session.userType) != -1 ) {
					ret = true;
						
				}else {
					ret = false;
				}
			
				return fn(ret);
		
			} else{
				res.send("The user does not exist");
			}
		});
	}else{
		res.send("You are not currently logged in. Please log in and try again.")
	}

	ret = true;
	return fn(ret);
}
		

exports.authenticate = authenticate;
exports.restrict = restrict;
