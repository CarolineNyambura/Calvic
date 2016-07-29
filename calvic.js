var express = require('express')
var app = express();

var allowCrossDomain = function(req, res, next) {

	if ('OPTIONS' == req.method) {
		// log.info("a cors req came in");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,PATCH,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Content-Length,X-Requested-With");
		res.sendStatus(200)
	} else {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,PATCH,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Content-Length,X-Requested-With");
		next();
	}
}

//CORS
app.use(allowCrossDomain)

// setting up the db
var waterlineInstance = require("waterline")

var Waterline = new waterlineInstance();


var members = waterlineInstance.Collection.extend({
	// properties of a model
	identity: "members",
	connection: "disk"
})
Waterline.loadCollection(members)


var videos = waterlineInstance.Collection.extend({
	// properties of a model
	identity: "videos",
	connection: "disk"
})
Waterline.loadCollection(videos)

var borrowed_videos = waterlineInstance.Collection.extend({
	// properties of a model
	identity: "borrowed_videos",
	connection: "disk"
})
Waterline.loadCollection(borrowed_videos)


var payments = waterlineInstance.Collection.extend({
	// properties of a model
	identity: "payments",
	connection: "disk"
})
Waterline.loadCollection(payments)



var returned_videos = waterlineInstance.Collection.extend({
	// properties of a model
	identity: "returned_videos",
	connection: "disk"
})
Waterline.loadCollection(returned_videos)



var config = {
	adapters: {
		disk: require("sails-disk")
	},

	connections: {
		disk: {
			adapter: "disk"
		}
	},
}

Waterline.initialize(config, function(err, models) {
	var db = models.collections;

	app.get("/", (req, res) => {
		res.send("hello world")
	})

	// get all the foos
	app.get("/borrowed", (req, res) => {
		db.borrowed.find().exec(function(err, borrowed) {
			console.log(err)
			res.send(borrowed)
		})
	})

	app.get("/returned", (req, res) => {
		db.returned.find().exec(function(err, returned) {
			console.log(err)
			res.send(returned)
		})
	})

	app.get("/borrowed/:Id", (req, res) => {
		db.borrowed.findOne({
			Id: req.params.Id
		}).exec(function(err, borrowed) {
			console.log(err)
			res.send(borrowed)
		})
	})

	app.get("/returned/:Id", (req, res) => {
		db.returned.findOne({
			Id: req.params.Id
		}).exec(function(err, returned) {
			console.log(err)
			res.send(returned)
		})
	})

	// register member
	app.post("/members/:name/:email/:contact", (req, res) => {
		var newMember = {
			name: req.params.name,
			email: req.params.email,
			contact: req.params.contact
		}

		db.members.create(newMember).exec(function(err, createdMember) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(createdMember)
			}
		})
	})

	app.get("/members", (req, res) => {

		db.members.find().exec(function(err, members) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(members)
			}
		})
	})



	// register videos
	app.post("/videos/:name/:category/:price", (req, res) => {
		var newVideo = {
			name: req.params.name,
			category: req.params.category,
			price: req.params.price
		}

		db.videos.create(newVideo).exec(function(err, createdVideo) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(createdVideo)
			}
		})
	})


	app.delete("/member/:member_id", (req, res) => {

		db.members.destroy({id:req.params.member_id}).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})

	app.get("/videos", (req, res) => {

		db.videos.find().exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})

	app.delete("/videos/:video_id", (req, res) => {

		db.videos.destroy({id:req.params.video_id}).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})


	// get the borrowed vids of one user
	app.get("/borrowed_videos/:user_id", (req, res) => {
		db.borrowed_videos.find({
			user_id: req.params.user_id
		}).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})

	app.post("/lend_video/:user_id/:video_id/:video_name/:video_category", (req, res) => {
		// 2* 60 * 60 *1000 - 2hours
		
		var borrowTime = new Date().getTime();

		var threeDays = 72 * 60 * 60 *1000
		var oneDay = 1 * 60 * 60 *1000

		var expectedDate = borrowTime + (72* 60 * 60 *1000)
		var dateOfReturn = borrowTime + (240* 60 * 60 *1000)

		var differenceTime = Number(dateOfReturn) - Number(expectedDate)
		console.log(Number(differenceTime) / Number(oneDay))


		// console.log(new Date(borrowTime).toUTCString(), new Date(expectedDate).toUTCString())

		var newVideo = {
			user_id: req.params.user_id,
			video_id: req.params.video_id,
			video_name: req.params.video_name,
			video_category: req.params.video_category
		}

		db.borrowed_videos.create(newVideo).exec(function(err, createdVideo) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(createdVideo)
			}
		})
	})



	// return a borrowed video
	app.get("/return_video/:video_id", (req, res) => {
		// find the video that was borrowed
		db.borrowed_videos.findOne({
			video_id: req.params.video_id
		}).exec(function(err, videos) {
			if (err) {
				console.log(err)
			} else {
				console.log(videos)
				var borrowedVid = {
					user_id:videos.user_id,
					video_id: videos.video_id,
					name: videos.video_name,
					category: videos.video_category
				}

				// add the video to returned vids
				db.returned_videos.create(borrowedVid).exec(function(err, createdVideo) {
					if (err) {
						res.status(400).send({
							err: err
						})
					} else {
						res.send(createdVideo)
					}

					db.borrowed_videos.destroy({
						id: videos.id
					}).exec(function(err, destroyed) {
						console.log(err,destroyed)
					})
				})
			}

		})
	})

	// get the borrowed vids of one user
	app.get("/returned_videos/:user_id", (req, res) => {
		db.returned_videos.find({
			user_id: req.params.user_id
		}).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})


		// get the borrowed vids of one user
	app.post("/pay/:user_id/:ammount", (req, res) => {
		var payment = {
			user_id:req.params.user_id,
			ammount:req.params.ammount
		}

		db.payments.create(payment).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})

	app.get("/payments/:user_id", (req, res) => {
		var payment = {
			user_id:req.params.user_id,
		}

		db.payments.find(payment).exec(function(err, videos) {
			if (err) {
				res.status(400).send({
					err: err
				})
			} else {
				res.send(videos)
			}
		})
	})

	app.listen(8080, function(error) {
		// will be called when the server starts
		console.log("server has started 8080")
	})
})