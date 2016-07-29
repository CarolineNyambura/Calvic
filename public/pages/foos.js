   var videosDb = [{
     Id: "1",
     name: "single ladies",
     category: "thriller"
   }, {
     Id: "2",
     name: "brave",
     category: "cartoon"
   }, {
     Id: "3",
     name: "originals",
     category: "general"
   }, {
     Id: "4",
     name: "vanish",
     category: "horror"
   }, {
     Id: "5",
     name: "two broke girls",
     category: "comedy"
   }, ]

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

   var inputForm = {
     controller: function() {
       return {
         Id: m.prop(""),
         name: m.prop(""),
         category: m.prop(""),
         fields: {
           name: m.prop(false),
         }
       }
     },
     view: function(ctrl, args) {
       // body...
       return m("div", [
         m(".modal-header", [
           m("p", "Input a new video")
         ]),

         m("form", {
           class: "container",
           onsubmit: function(e) {
             console.log("i have been d=mhnbvlij")
             videosDb.push({
                 Id: ctrl.Id(),
                 name: ctrl.name(),
                 category: ctrl.category()
               }),
               $('#modal1').closeModal();
             e.preventDefault();
           }
         }, [
           m(".input-field", [
             // m("i",{class:"mdi-action-lock prefix purple-text"}),

             m("input", {
               type: "checkbox",
               checked: ctrl.fields.name(),
               onchange: (function(e) {
                 ctrl.fields.name(e.target.checked)
               })
             }),
             //          <p>
             //   <input type="checkbox" id="test6" checked="checked" />
             //   <label for="test6">Yellow</label>
             // </p>
             // <p>
             m("input", {
               type: "checkbox",
               id: "test 6",
               // labelId:"test 6",
             }, "yellow"),

             input({
               size: "col l12",
               placeholder: "id",
               oninput: m.withAttr("checked", ctrl.Id),
               value: ctrl.Id
             }),

             input({
               size: "col l12",
               placeholder: "name",
               oninput: m.withAttr("checked", ctrl.name),
               value: ctrl.name
             })
           ]),

           input({
             size: "col l12",
             placeholder: "category",
             oninput: m.withAttr("checked", ctrl.category),
             value: ctrl.category
           })
         ]),

         m(".modal-footer", [
           m("btn", {
             class: "btn",
             type: "submit",
             onclick: function(e) {
               console.log("clicked")

               videosDb.push({
                   Id: ctrl.Id(),
                   name: ctrl.name(),
                   category: ctrl.category()
                 }),
                 $('#modal1').closeModal();
               ctrl.Id("")
               ctrl.name("")
               ctrl.category("")
               e.preventDefault();
             }
           }, "save"),
         ])
       ])
     }
   }

   var foosComponent = {
     controller: function() {
      var foos = m.request({
        url:"http://localhost:8080/foos"
      })

       return {
         videos: videosDb,
         foos:foos
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
           }, "DVD Catalogue")),
           m(".col l6", [
             m("br"),
             m("a", {
               class: "btn right",
               href: "#modal1",
               onclick: function() {
                 $('#modal1').openModal();
               },
               config: function() {
                 $('.modal-trigger').leanModal();
               }
             }, "Save Video"),
             modalMaker({
               Id: "modal1",
               class: "modal",
               body: inputForm
             })
           ])
         ]),
         m("table", [
           m("thead", [
             m("tr", [
               m("th", "id"),
               m("th", "name"),
               m("th", "clan"),
               m("th", "age")
             ])
           ]),
           m("tbody", [
             ctrl.foos().map(function(foo) {
               return m("tr", [
                 m("td", foo.id),
                 m("td", foo.name),
                 m("td", foo.clan),
                 m("td", foo.age)
               ])
             })
           ])
         ])
       ])
     }
   }