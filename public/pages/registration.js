 var membersDb = [{
 		name: "Caroline Nyambura",
 		contact: "0720923708"
 	}, {
 		name: "Branson Gitomeh",
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
 			m("p", "Membership Card"),
 			m(argument.body)
 		])
 	])
 }


 function input(argument) {
 	return m("input", {
 		class: argument.size,
 		placeholder: argument.placeholder,
 		oninput: m.withAttr("value", argument.value)
 			// value: argument.value()
 	})
 }

 var inputForm = {
 	controller: function() {
 		return {
 			name: m.prop(""),
 			contact: m.prop("")
 		}
 	},
 	view: function(ctrl, args) {
 		// body...
 		return m("form", {
 			class: "container",
 			onsubmit: function(e) {
 				console.log("i have been d=mhnbvlij")
 				membersDb.push({
 						name: ctrl.name(),
 						contact: ctrl.contact()
 					}),
 					$('#modal4').closeModal();
 				e.preventDefault();
 			}
 		}, [
 			m("div", {
 				class: "row col l12"
 			}, [
 				m(".input-field col l6", [
 					input({
 						class: "mdi-action-lock prefix teal-text",
 						placeholder: "First Name",
 						oninput: m.withAttr("value", ctrl.name),
 						value: ctrl.name
 					})
 				]),

 				m(".input-field col l6", [
 					input({
 						placeholder: "Sur Name",
 						oninput: m.withAttr("value", ctrl.name),
 						value: ctrl.name
 					})
 				]),
 				m(".input-field", [
 					input({
 						placeholder: "Email",
 						oninput: m.withAttr("value", ctrl.Email),
 						value: ctrl.Email,
 						// class: "mdi-communication-quick-contacts-mail prefix",

 					})
 				]),

 				m(".input-field col l6", [
 					input({
 						placeholder: "Password",
 						oninput: m.withAttr("value", ctrl.Password),
 						value: ctrl.Password
 					})
 				]),
 				m(".input-field col l6", [
 					input({
 						placeholder: "Confirm Password",
 						oninput: m.withAttr("value", ctrl.confirmPassword),
 						value: ctrl.confirmPassword
 					})
 				]),
 				m("input-field", [
 					input({
 						placeholder: "Contact",
 						oninput: m.withAttr("value", ctrl.contact),
 						value: ctrl.contact
 					})
 				])
 			]),



 			m("btn", {
 				class: "btn",
 				type: "submit",
 				onclick: function(e) {
 					console.log("clicked")

 					membersDb.push({
 							name: ctrl.name(),
 							contact: ctrl.contact()
 						}),
 						$('#modal4').closeModal();
 					ctrl.name("")
 					ctrl.contact("")
 					e.preventDefault();
 				}
 			}, "Print"),
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
 						// href: "#modal4",
 						onclick: function() {
 							$('#modal4').openModal();
 						},
 						config: function() {
 							$('.modal-trigger').leanModal();
 						}
 					}, "Save"),
 					modalMaker({
 						id: "modal4",
 						class: "modal",
 						body: inputForm
 					})
 				])
 			]),
 			m("table", [
 				m("thead", [
 					m("tr", [
 						m("th", "Name"),
 						m("th", "contact")
 					])
 				]),
 				m("tbody", [
 					ctrl.registrations.map(function(registration) {
 						return m("tr", [
 							m("td", registration.name),
 							m("td", registration.contact)
 						])
 					})
 				])
 			])
 		])
 	}
 }