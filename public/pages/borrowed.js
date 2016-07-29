   var borrowedDb = [{
     category: "thriller",
     dateBorrowed: "29-06-016",
     billings: "shs.60/-"
   }, {
     category: "cartoon",
     dateBorrowed: "30-06-016",
     billings: "shs.80/-"
   }, {
     category: "general",
     dateBorrowed: "01-07-016",
     billings: "shs.50/-"
   }, {
     category: "horror",
     dateBorrowed: "02-07-016",
     billings: "shs.40/-"
   }, {
     category: "comedy",
     dateBorrowed: "03-07-016",
     billings: "shs.40/-"
   }, ]

   //call this function to make a modal
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


   // call this function to make an input
   function input(argument) {
     return m("input", {
       class: argument.size,
       placeholder: argument.placeholder,
       oninput: m.withAttr("value", argument.value),
       value: argument.value()
     })
   }

   var borrowedForm = {
     controller: function() {
       return {
         Id: m.prop(""),
         category: m.prop(""),
         dateBorrowed: m.prop(""),
         billings: m.prop("")
       }
     },
     view: function(ctrl, args) {
       // body...
       return m("div", [
         m(".modal-header", [
           m("p", "Please input a new borrowed movie")
         ]),

         m("form", {
           class: "container",
           onsubmit: function(e) {
             m.request({
                 url: "localhost:8080/newborrow/01-07-016"
               }),
               console.log("i have been logged")
             borrowedDb.push({
                 id: ctrl.Id(),
                 category: ctrl.category(),
                 dateBorrowed: ctrl.dateBorrowed(),
                 billings: ctrl.billings()
               }),
               $('#modal2').closeModal();
             e.preventDefault();
           }
         }, [
           input({
             placeholder: "Movie Id",
             oninput: m.withAttr("value", ctrl.Id),
             value: ctrl.Id
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

               borrowedDb.push({
                   Id: ctrl.Id(),
                   category: ctrl.category(),
                   dateBorrowed: ctrl.dateBorrowed(),
                   billings: ctrl.billings()
                 }),
                 $('#modal2').closeModal();
               ctrl.Id("")
               ctrl.category("")
               ctrl.dateBorrowed("")
               ctrl.billings("")
               e.preventDefault();
             }
           }, "save"),
         ])
       ])
     }
   }

   var borrowed = {
     controller: function() {
       return {
         borrowings: borrowedDb
       }
     },
     view: function(ctrl, args) {
       console.log(ctrl.borrowings)
       return m("div", {
         class: "container"
       }, [
         m(".row", [
           m("br"),
           m(".col l6", m("h5", {
             class: "header"
           }, "Record for the borrowed DVDs")),
           m(".col l6", [
             m("br"),
             m("a", {
               class: "btn right",
               href: "#modal2",
               onclick: function() {
                 $('#modal2').openModal();
               },
               config: function() {
                 $('.modal-trigger').leanModal();
               }
             }, "Save Video"),
             modalMaker({
               id: "modal2",
               class: "modal",
               body: borrowedForm
             })
           ])
         ]),
         m("table", [
           m("thead", [
             m("tr", [
               m("th", "Id"),
               m("th", "category"),
               m("th", "dateBorrowed"),
               m("th", "dateOfReturn"),
               m("th", "billings")
             ])
           ]),
           m("tbody", [
             ctrl.borrowings.map(function(borrowing) {
               return m("tr", [
                 m("td", borrowing.Id),
                 m("td", borrowing.category),
                 m("td", borrowing.dateBorrowed),
                 m("td", borrowing.dateOfReturn),
                 m("td", borrowing.billings)
               ])
             })
           ])
         ])
       ])
     }
   }