  var returnedDb = [{
      name: "final destination",
      category: "horror",
      dateBorrowed: "29-06-016",
      dueDate: "03-07-016",
      daysOverdue: "2",
      billings:"shs.40/-"
    }, {
      name: "flying monkey",
      category: "horror",
      dateBorrowed: "30-06-016",
      dueDate: "06-07-016",
      daysOverdue: "3",
      billings:"shs.40/-"
    }, {
      name: "jippers creepers",
      category: "horror",
      dateBorrowed: "01-07-016",
      dueDate: "04-07-016",
      daysOverdue: "1",
      billings:"shs.40/-"
    }, {
      name: "mirror",
      category: "horror",
      dateBorrowed: "02-07-016",
      dueDate: "09-07-016",
      daysOverdue: "5",
      billings:"shs.40/-"

    }, {
      name: "a thousand ways to die",
      category: "horror",
      dateBorrowed: "03-07-016",
      dueDate: "11-07-016",
      daysOverdue: "4",
      billings:"shs.40/-"

    }, ]
    // input for the modal
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
      value: argument.value()
    })
  }

  var returnedForm = {
    controller: function() {
      return {
        name: m.prop(""),
        category: m.prop(""),
        dateBorrowed: m.prop(""),
        dueDate: m.prop(""),
        daysOverdue: m.prop(""),
        billings:m.prop("")
      }
    },
    view: function(ctrl, args) {
      // body...
      return m("div", [
        m(".modal-header", [
          m("p", "Please input a returned video name")
        ]),

        m("form", {
          class: "container",
          onsubmit: function(e) {
            console.log("i have been selected")
            returnedDb.push({
                name: ctrl.name(),
                category: ctrl.category(),
                dateBorrowed: ctrl.dateBorrowed(),
                dueDate: ctrl.dueDate(),
                daysOverdue: ctrl.daysOverdue()
              }),
              $('#modal3').closeModal();
            e.preventDefault();
          }
        }, [
          input({
            placeholder: "name",
            oninput: m.withAttr("value", ctrl.name),
            value: ctrl.name
          }),
          input({
            placeholder: "category",
            oninput: m.withAttr("value", ctrl.category),
            value: ctrl.category
          }),
          input({
            placeholder: "dateBorrowed",
            oninput: m.withAttr("value", ctrl.dateBorrowed),
            value: ctrl.dateBorrowed
          }),
          input({
            placeholder: "dateOfReturn",
            oninput: m.withAttr("value", ctrl.dateOfReturn),
            value: ctrl.dateOfReturn
          }),
          input({
            placeholder: "dueDate",
            oninput: m.withAttr("value", ctrl.dueDate),
            value: ctrl.dueDate
          }),
          input({
            placeholder: "daysOverdue",
            oninput: m.withAttr("value", ctrl.daysOverdue),
            value: ctrl.daysOverdue
          }),
           input({
            placeholder: "billings",
            oninput: m.withAttr("value", ctrl.billings),
            value: ctrl.billings
          })
           ]),

        m(".modal-footer", [
          m("btn", {
            class: "btn",
            type: "submit",
            onclick: function(e) {
              console.log("clicked")
              returnedDb.push({
                  name: ctrl.name(),
                  category: ctrl.category(),
                  dateBorrowed: ctrl.dateBorrowed(),
                  dateOfReturn: ctrl.dateOfReturn(),
                  dueDate: ctrl.dueDate(),
                  daysOverdue: ctrl.daysOverdue(),
                  billings:ctrl.billings()
                }),
                $('#modal3').closeModal();
              ctrl.name("")
              ctrl.category("")
              ctrl.dateBorrowed("")
              ctrl.dateOfReturn("")
              ctrl.dueDate("")
              ctrl.daysOverdue("")
              ctrl.billings("")
              e.preventDefault();
            }
          }, "save"),
        ])
      ])
    }
  }
  var returned = {
    controller: function() {
      return {
        returnings: returnedDb
      }
    },
    view: function(ctrl, args) {
      console.log(ctrl.returnings)
      return m("div", {
        class: "container"
      }, [
        m(".row", [
          m("br"),
          m(".col l6",
            m("h5", {
              class: "header"
            }, "Record for the returned DVDs")),
          m(".col l6", [
            m("br"),
            m("a", {
              class: "btn right",
              href: "#modal3",
              onclick: function() {
                $('#modal3').openModal();
              },
              config: function() {
                $('.modal-trigger').leanModal();
              }
            }, "Save Video"),
            modalMaker({
              id: "modal3",
              class: "modal",
              body: returnedForm
            })
          ])
        ]),
        m("table", [
          m("thead", [
            m("tr", [
              m("th", "Id"),
              m("th", "Category"),
              m("th", "dateBorrowed"),
              m("th", "dateOfReturn"),
              m("th", "dueDate"),
              m("th", "daysOverdue"),
              m("th","billings")
            ])
          ]),
          m("tbody", [
            ctrl.returnings.map(function(returning) {
              return m("tr", [
                m("td", returning.Id),
                m("td", returning.category),
                m("td", returning.dateBorrowed),
                m("td", returning.dateOfReturn),
                m("td", returning.dueDate),
                m("td", returning.daysOverdue),
                m("td",returning.billings)
              ])
            })
          ])
        ])
      ])
    }
  }