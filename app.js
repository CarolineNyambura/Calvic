//component for a single item

var apiUrl = "http://localhost:8080"

var app = {
	controller:function(){
		var videos = m.request({
			url:apiUrl + "/videos"
		})

		return {
			videos:videos
		}
	},
	view:function(ctrl, args){
		return m("div",ctrl.videos().name + " - " + ctrl.videos().category)
	}
}

m.mount(document.getElementById("singleItem"), app)


// for array

var apiUrl = "http://localhost:8080"

var app = {
	controller:function(){
		var borrowing = m.request({
			url:apiUrl + "/borrowing"
		})

		return {
			borrowing:borrowing
		}
	},
	view:function(ctrl, args){
		return m("div",[
			ctrl.borrowings().map(function(borrowing){
				return m("li",borrowing.dateBorrowed + " " + borrowing.dateOfReturn)
			})
		])
	}
}

m.mount(document.getElementById("Array"), app)