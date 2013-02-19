//Post a like to the Graph
	app.post('/events/like', function (req, res) {	
		var body = req.body;
		var user;
		var like;
		var fbResult;
		
		Step(
            function () {
				//Find the user by rfid
                User.findOne({'rfids.rfid': { $in: [body.rfid] } }, this);
            },
			function (err, doc) {
				//Add the like to the collection for analytics
				if(err) throw err;
                if(!doc) { res.send({ message: 'User not found' }); return; }
				user = doc;		
							
				 var like = new Like({
	                eventId: 	user.eventId,
                    rfid: 		body.rfid,
					url: 		body.url,
					success: 	false,
					error: 		''						
	            });
				
				if(user.facebook.accessToken) {
	            	like.save(this);
				} else {
					res.send({ message: 'Not a Facebook user' });
					return;					
				}
			},
            function (err, doc) {
				//send the like to the graph
                if(err) throw err;
                if(!doc) { res.send(404); return; }
				like = doc;
							
				var options 	= {},
					url     	= '';

		        //url 	= '/me/' + settings.facebook.namespace + ':likes';
				url 	= '/me/og.likes';
		        options = {
		            'access_token':   user.facebook.accessToken,
		            'object':         body.url,
		        };

		        FB.napi(url, 'post', options, this);
            },
			function(err, result) {		
				//update the status of the like			
				if(err) {
					like.set({sucess: false, error: err})
				}
				else {					
					fbResult = result;
					like.set({success: true});
				}
				like.save(this);
			},
			function (err, doc) {
				if(err) throw err;

				if(fbResult) {
					res.send(fbResult);
				}
				else {
					res.send(404);
				}				
			}
        );
    });