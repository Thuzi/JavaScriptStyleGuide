//Post a like to the Graph
	app.post('/events/like', function (req, res, next) {	
		var body 				= req.body,
			fbResult 			= {},
			like 				= {},
			likeGraphUrl 		= {},
			likeGraphOptions 	= {},
			user 				= {};
			
		Step(
            function findUserByRfid () {
                User.findOne({'rfids.rfid': { $in: [body.rfid] } }, this);
            },
			function addLikeToCollection (err, doc) {
				if (err) throw err;
                if (!doc) throw new Error('User not found');

				user = doc;		
							
				like = new Like({
	                error: 		'',	
	                eventId: 	user.eventId,
                    rfid: 		body.rfid,
					success: 	false,
					url: 		body.url
	            });
				
				if (!user.facebook.accessToken) {
					throw new Error('Not a Facebook user');	            	
				}

				like.save(this);
			},
            function postLikeToGraph (err, doc) {
                if (err) throw err;
                if (!doc) throw new Error('Error saving to database');

				likeGraphUrl 		= '/me/og.likes',
		        likeGraphOptions 	= {
					'access_token':   user.facebook.accessToken,
		            'object':         body.url
		       	};
							
		        FB.napi(likeGraphUrl, 'post', likeGraphOptions, this);
            },
			function updateLikeStatus (err, result) {		
				if (err) {
					like.set({sucess: false, error: err})
				}
				else {					
					fbResult = result;
					like.set({success: true});
				}

				like.save(this);
			},
			function done (err, doc) {
				if (err) return next(err);
				if (!fbResult) return next(new Error('Could not save to Facebook'))

				res.send(fbResult);
			}
        );
    });