 var membersDb = [{
 		name: "Caroline Nyambura",
 		email: "karolinanyambura67@gmail.com",
 		confirmPassword: " ",
 		contact: "0720923708"
 	}, {
 		name: "Branson Gitomeh",
 		email: "bransongitomeh67@gmail.com",
 		confirmPassword: " ",
 		contact: "0711657108"
 	}]
 	// input function for the modal
 function modalMaker(argument) {
 	return m("." + argument.class, {
 		id: argument.id
 	}, [
 		m("div", {
 			class: "center"
 		}, [
 			m(argument.body)
 		])
 	])
 }


 function input(argument) {
 	return m("input", {
 		class: argument.size,
 		placeholder: argument.placeholder,
 		oninput: m.withAttr("value", argument.value),
 		// value: argument.value()
 	})
 }

 // this is the form that will be in the modal8
 var registrationForm = {
 	controller: function() {
 		return {
 			name: m.prop(""),
 			email: m.prop(""),
 			password: m.prop(""),
 			confirmPassword: m.prop(""),
 			contact: m.prop("")
 		}
 	},
 	view: function(ctrl, args) {
 		// body...
 		return m("div", [

 			m(".modal-header", [
 				m("p", "Membership Card")
 			]),

 			m("form", {
 				class: "container",
 				onsubmit: function(e) {
 					console.log("i have been d=mhnbvlij")
 					membersDb.push({
 							name: ctrl.name(),
 							email: ctrl.email(),
 							password: ctrl.password(),
 							confirmPassword: ctrl.confirmPassword(),
 							contact: ctrl.contact()
 						}),
 						$('#modal4').closeModal();
 					e.preventDefault();
 				}
 			}, [

 				m(".input-field", [
 					m("i", {
 						class: "mdi-action-lock prefix"
 					}),
 					input({
 						placeholder: "your full name",
 						oninput: m.withAttr("value", ctrl.name),
 						value: ctrl.name
 					})
 				]),
 				m(".input-field", [
 					m("i", {
 						class: "mdi-communication-quick-contacts-mail prefix teal-text"
 					}),
 					input({
 						placeholder: "Email Address",
 						oninput: m.withAttr("value", ctrl.email),
 						value: ctrl.email,
 					})
 				]),
 				m(".input-field", [
 					m("i", {
 						class: "mdi-action-lock-outline prefix teal-text"
 					}),
 					input({
 						type: "password",
 						placeholder: "Password",
 						oninput: m.withAttr("value", ctrl.password),
 						value: ctrl.password
 					})
 				]),
 				m(".input-field", [
 					m("i", {
 						class: "mdi-action-lock-outline prefix"
 					}),
 					input({
 						type: "password",
 						placeholder: "Confirm Password",
 						oninput: m.withAttr("value", ctrl.confirmPassword),
 						value: ctrl.confirmPassword
 					})
 				]),
 				m(".input-field", [
 					m("i", {
 						class: "mdi-action-lock prefix"
 					}),
 					input({
 						placeholder: "Contact",
 						oninput: m.withAttr("value", ctrl.contact),
 						value: ctrl.contact
 					})
 				]),


 			]),

 			m(".modal-footer", [
 				m("btn", {
 					class: "btn",
 					type: "submit",
 					onclick: function(e) {
 						console.log("clicked")

 						membersDb.push({
 								name: ctrl.name(),
 								email: ctrl.email(),
 								password: ctrl.password(),
 								confirmPassword: ctrl.confirmPassword(),
 								contact: ctrl.contact()
 							}),
 							$('#modal4').closeModal();
 					}
 				}, "Print"),
 			]),
 		])
 	}
 }

 var registration = {
 	controller: function() {
 		return {
 			registrations: membersDb
 		}
 	},
 	view: function(ctrl, args) {
 		console.log(ctrl.registrations)
 		return m("div", {
 			class: "container"
 		}, [
 			m(".row", [
 				m("br"),
 				m(".col l6", m("h5", {
 					class: "header"
 				}, "Members")),
 				m(".col l6", [
 					m("br"),
 					m("a", {
 						class: "btn right",
 						href: "#modal4",
 						onclick: function() {
 							$('#modal4').openModal();
 						},
 						config: function() {
 							$('.modal-trigger').leanModal();
 						}
 					}, "Add Member"),
 					modalMaker({
 						id: "modal4",
 						class: "modal",
 						//name of the component that will be in the modal
 						body: registrationForm
 					})
 				])
 			]),
 			m("table", [
 				m("thead", [
 					m("tr", [
 						m("th", "name"),
 						m("th", "email"),
 						m("th", "password"),
 						m("th", "contact")
 					])
 				]),
 				m("tbody", [
 					ctrl.registrations.map(function(registration) {
 						return m("tr", [
 							m("td", registration.name),
 							m("td", registration.email),
 							m("td", registration.password),
 							m("td", registration.contact)
 						])
 					})
 				])
 			])
 		])
 	}
 }