// functions to be used
function logger(req, res, next) {
	// middleware to log requests
	// console.log(req.method, req.url)
	next()
}


function server_started(error) {
	// will be called when the server starts
	console.log("server has started")

}

function home(req, res) {
	// matches home
	console.log("home called")
	// res.send(item)

}

function videos(req, res) {
	console.log("item")
		// objects...
	var videos = [{
		name: "single ladies",
		category: "thriller"
	}, {
		name: "walking dead",
		category: "horror"
	}]
	res.send(videos)
}


function borrowing(req, res) {
	console.log("borrowing")
		// array of objects...
	var borrowing = [{
		dateBorrowed: "29-06-016",
		dateOfReturn: "01-07-016"
	}, {
		dateBorrowed: "29-06-016",
		dateOfReturn: "01-07-016"
	}, {
		dateBorrowed: "29-06-016",
		dateOfReturn: "01-07-016"
	}, {
		dateBorrowed: "29-06-016",
		dateOfReturn: "01-07-016"
	}, {
		dateBorrowed: "29-06-016",
		dateOfReturn: "01-07-016"
	}]

	res.send(borrowing)
}


// the actual app
var express = require('express')
var app = express();

app.use(express.static('pages'));

// app.use(logger)

app.get("/videos", videos)

app.get("/borrowing", borrowing)

app.listen(8080, server_started)