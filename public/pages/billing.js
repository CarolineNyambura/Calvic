	var billingDb = [{
			name: "Caroline Nyambura",
			movieName: "originals",
			category: "horror",
			moviesBorrowed: "3",
			charges: "$150/-",
			contact: "0720923708"
		}, {
			name: "Branson Gitomeh",
			movieName: "empire",
			category: "general",
			moviesBorrowed: "4",
			charges: "$200/-",
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
			oninput: m.withAttr("value", argument.value),
			// value: argument.value()
		})
	}

	// this is the form that will be in the modal
	var billingForm = {
		controller: function() {
			return {
				name: m.prop(""),
				movieName: m.prop(""),
				category: m.prop(""),
				moviesBorrowed: m.prop(""),
				contact: m.prop("")
			}
		},
		view: function(ctrl, args) {
			// body...
			return m("form", {
				class: "container",
				onsubmit: function(e) {
					console.log("i have been d=mhnbvlij")
					billingDb.push({
							name: ctrl.name(),
							movieName: ctrl.movieName(),
							category: ctrl.category(),
							moviesBorrowed: ctrl.moviesBorrowed(),
							contact: ctrl.contact()
						}),
						$('#modal5').closeModal();
					e.preventDefault();
				}
			}, [
				m("div", {
					class: "row"
				}, [
					m(".input-field", [
						input({
							placeholder: "your full name",
							oninput: m.withAttr("value", ctrl.name),
							value: ctrl.name
						})
					]),
					m(".input-field", [
						input({
							placeholder: "name of the movie",
							oninput: m.withAttr("value", ctrl.movieName),
							value: ctrl.movieName,
						})
					]),
					m(".input-field col l6", [
						input({
							type: "category",
							placeholder: "category",
							oninput: m.withAttr("value", ctrl.category),
							value: ctrl.category
						})
					]),
					m(".input-field col l6", [
						input({
							type: "text",
							placeholder: "number of the movies borrowed",
							oninput: m.withAttr("value", ctrl.moviesBorrowed),
							value: ctrl.moviesBorrowed
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

						billingDb.push({
								name: ctrl.name(),
								movieName: ctrl.movieName(),
								category: ctrl.category(),
								moviesBorrowed: ctrl.moviesBorrowed(),
								contact: ctrl.contact()
							}),
							$('#modal5').closeModal();
					}
				}, "Print"),
			])
		}
	}

	var billing = {
		controller: function() {
			return {
				billings: billingDb
			}
		},
		view: function(ctrl, args) {
			console.log(ctrl.billings)
			return m("div", {
				class: "container"
			}, [
				m(".row", [
					m("br"),
					m(".col l6", m("h5", {
						class: "header"
					}, "Receipt")),
					m(".col l6", [
						m("br"),
						m("a", {
							class: "btn right",
							href: "#modal5",
							onclick: function() {
								$('#modal5').openModal();
							},
							config: function() {
								$('.modal-trigger').leanModal();
							}
						}, "Save"),
						modalMaker({
							id: "modal5",
							class: "modal",
							//name of the component that will be in the modal
							body: billingForm
						})
					])
				]),
				m("table", [
					m("thead", [
						m("tr", [
							m("th", "name"),
							m("th", "movieName"),
							m("th", "category"),
							m("th", "moviesBorrowed"),
							m("th", "contact")
						])
					]),
					m("tbody", [
						ctrl.billings.map(function(billing) {
							return m("tr", [
								m("td", billing.name),
								m("td", billing.movieName),
								m("td", billing.category),
								m("td", billing.moviesBorrowed),
								m("td", billing.contact)
							])
						})
					])
				])
			])
		}
	}
