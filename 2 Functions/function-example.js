/*

2) functions 
 2.1) I/O bound functions take callbacks
 2.2) return err as the first argument

*/

function foo (email, password, callback) {
	var conditions = {
		active: 	true,
		email: 		email,
		password: 	this.hash(password)
	};

	this.findOne(conditions, function (err, doc) {
        if (err) 	return callback(err);
        if (!doc)	return callback(null, false, { message: 'Incorrect email / password' });
        
        return callback(null, doc);
    });
}
