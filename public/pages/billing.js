	var billingDb = [{
			name: "Caroline Nyambura",
			membershipNo: "1",
			movieName: "originals",
			category: "horror",
			moviesBorrowed: "3",
			charges: "$150/-",
			contact: "0720923708"
		}, {
			name: "Branson Gitomeh",
			membershipNo: "2",
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
			return m("div", [
				m(".modal-header", [
					m("p", "Receipt")
				]),

				m("form", {
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
						m(".input-field col l6", [
							input({
								placeholder: "your full name",
								oninput: m.withAttr("value", ctrl.name),
								value: ctrl.name
							})
						]),
						m(".input-field col l6", [
							input({
								placeholder: "your membership number",
								oninput: m.withAttr("value", ctrl.membershipNo),
								value: ctrl.membershipNo
							})
						]),
						m(".input-field", [
							input({
								placeholder: "Movie Id",
								oninput: m.withAttr("value", ctrl.Id),
								value: ctrl.Id,
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
						]),

						// < p >
						//   <input type="checkbox" id="test6" checked="checked" />
						//   <label for="test6">Yellow</label>
						// </p>
						// m("input-field", [
						// 	input({
						// 		type: "checkbox",
						// 		id: "test6",
						// 		checked: "checked",
						// 		labelFor:"test6"
						// 	},"Yellow"),
						// ])
					]),

					m(".modal-footer", [
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
				])
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
							m("th", "Id"),
							m("th", "category"),
							m("th", "contact")
						])
					]),
					m("tbody", [
						ctrl.billings.map(function(billing) {
							return m("tr", [
								m("td", billing.name),
								m("td", billing.Id),
								m("td", billing.category),
								m("td", billing.contact)
							])
						})
					])
				])
			])
		}
	}