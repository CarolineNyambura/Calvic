   var videosDb = [{
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
     // input function for the modal
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


   function input(argument) {
     return m("input", {
       class: argument.size,
       placeholder: argument.placeholder,
       oninput: m.withAttr("value", argument.value),
       value: argument.value()
     })
   }

   var inputForm = {
     controller: function() {
       return {
         name: m.prop(""),
         category: m.prop(""),
         dateBorrowed: m.prop(" "),
         dateOfReturn: m.prop(" ")
       }
     },
     view: function(ctrl, args) {
       // body...
       return m("form", {
         class: "container",
         onsubmit: function(e) {
           console.log("i have been d=mhnbvlij")
           videosDb.push({
               name: ctrl.name(),
               category: ctrl.category(),
               dateBorrowed: ctrl.dateBorrowed(),
               dateOfReturn: ctrl.dateOfReturn()
             }),
             $('#modal2').closeModal();
           e.preventDefault();
         }
       }, [

         // m(".input-field", [
           // m("i",{class:"mdi-action-lock prefix purple-text"}),
           input({
             size: "col l12",
             placeholder: "name",
             oninput: m.withAttr("value", ctrl.name),
             value: ctrl.name
           }),
           input({
             size: "col l12",
             placeholder: "category",
             oninput: m.withAttr("value", ctrl.category),
             value: ctrl.category
           }),

           input({
             size: "col l12",
             placeholder: "dateBorrowed",
             oninput: m.withAttr("value", ctrl.dateBorrowed),
             value: ctrl.dateBorrowed
           }),

           input({
             size: "col l12",
             placeholder: "dateOfReturn",
             oninput: m.withAttr("value", ctrl.dateOfReturn),
             value: ctrl.dateOfReturn
           }),
         // ]),
         m("btn", {
           class: "btn",
           type: "submit",
           onclick: function(e) {
             console.log("clicked")

             videosDb.push({
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
         videos: videosDb
       }
     },
     view: function(ctrl, args) {
       console.log(ctrl.videos)
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
               body: inputForm
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
             ctrl.videos.map(function(video) {
               return m("tr", [
                 m("td", video.name),
                 m("td", video.category),
                 m("td", video.dateBorrowed),
                 m("td", video.dateOfReturn)
               ])
             })
           ])
         ])
       ])
     }
   }