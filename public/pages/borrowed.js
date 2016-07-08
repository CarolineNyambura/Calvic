   var borrowedDb = [{
     name: "single ladies",
     category: "thriller",
     dateBorrowed: "29-06-016",
     dateOfReturn: "01-07-016"
   }, {
     name: "brave",
     category: "cartoon",
     dateBorrowed: "30-06-016",
     dateOfReturn: "03-07-016"
   }, {
     name: "originals",
     category: "general",
     dateBorrowed: "01-07-016",
     dateOfReturn: "03-07-016"
   }, {
     name: "vanish",
     category: "horror",
     dateBorrowed: "02-07-016",
     dateOfReturn: "05-07-016"
   }, {
     name: "two broke girls",
     category: "comedy",
     dateBorrowed: "03-07-016",
     dateOfReturn: "07-07-016"
   }, ]

   //call this function to make a modal
   function modalMaker(argument) {
     return m("." + argument.class, {
       id: argument.id
     }, [
       m("div", {
         class: "center"
       }, [
         m("p", "Please input a new video name"),
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
         name: m.prop(""),
         category: m.prop(""),
         dateBorrowed: m.prop(""),
         dateOfReturn: m.prop("")
       }
     },
     view: function(ctrl, args) {
       // body...
       return m("form", {
         class: "container",
         onsubmit: function(e) {
           console.log("i have been logged")
           borrowedDb.push({
               name: ctrl.name(),
               category: ctrl.category(),
               dateBorrowed: ctrl.dateBorrowed(),
               dateOfReturn: ctrl.dateOfReturn()
             }),
             $('#modal2').closeModal();
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
         m("btn", {
           class: "btn",
           type: "submit",
           onclick: function(e) {
             console.log("clicked")

             borrowedDb.push({
                 name: ctrl.name(),
                 category: ctrl.category(),
                 dateBorrowed: ctrl.dateBorrowed(),
                 dateOfReturn: ctrl.dateOfReturn()
               }),
               $('#modal2').closeModal();
             ctrl.name("")
             ctrl.category("")
             ctrl.dateBorrowed("")
             ctrl.dateOfReturn("")
             e.preventDefault();
           }
         }, "save"),
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
           }, "The following is a list of the borrowed videos")),
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
               m("th", "Name"),
               m("th", "Category"),
               m("th", "dateBorrowed"),
               m("th", "dateOfReturn")
             ])
           ]),
           m("tbody", [
             ctrl.borrowings.map(function(borrowing) {
               return m("tr", [
                 m("td", borrowing.name),
                 m("td", borrowing.category),
                 m("td", borrowing.dateBorrowed),
                 m("td", borrowing.dateOfReturn)
               ])
             })
           ])
         ])
       ])
     }
   }