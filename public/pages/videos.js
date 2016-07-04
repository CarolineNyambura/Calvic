   var videosDb = [{
    name:"single ladies",
    category:"thriller"
  },
  {
    name:"brave",
    category:"cartoon"
  },
  {
    name:"originals",
    category:"general"
    },
    {
      name:"vanish",
      category:"horror"
    },
    {
      name:"two broke girls",
      category:"comedy"
    },
  ]
// input function for the modal
  function modalMaker(argument) {
    return m("." + argument.class,{
      id:argument.id
    },[
      m("div",{class:"center"},[
        m("p","Please input a new video name"),
        m(argument.body)
      ])
    ])
  }


  function input(argument){
    return m("input",{
      class:argument.size,
      placeholder:argument.placeholder,
      oninput: m.withAttr("value",argument.value),
      value:argument.value()
    })
  }

  var inputForm = {
    controller:function(){
      return {
        name:m.prop(""),
        category:m.prop("")
      }
    },
  view:function (ctrl, args) {
    // body...
    return m("form",{
      class:"container",
      onsubmit:function(e){
        console.log("i have been d=mhnbvlij")
        videosDb.push({
          name:ctrl.name(),
          category:ctrl.category()
        }),
        $('#modal1').closeModal();
        e.preventDefault();
      }
    },[

      m(".input-field",[
        // m("i",{class:"mdi-action-lock prefix purple-text"}),
        input({
          size:"col l12",
          placeholder:"name",
          oninput: m.withAttr("value",ctrl.name),
          value:ctrl.name
        }),
      ]),

      input({
        size:"col l12",
        placeholder:"name",
        oninput: m.withAttr("value",ctrl.category),
        value:ctrl.category
      }),

      m("btn",{
        class:"btn",
        type:"submit",
        onclick:function(e){
          console.log("clicked")

          videosDb.push({
            name:ctrl.name(),
            category:ctrl.category()
          }),
          $('#modal1').closeModal();
          ctrl.name("")
          ctrl.category("")
          e.preventDefault();
        }
      },"save"),
    ])
  }
}

  var videos  = {
    controller:function(){
      return {
        videos:videosDb
      }
    },
    view:function(ctrl, args){
      console.log(ctrl.videos)
      return m("div",{class:"container"},[
        m(".row",[
          m("br"),
          m(".col l6",m("h5",{class:"header"},"Video Catalogue")),
          m(".col l6",[
            m("br"),
            m("a",{
              class:"btn right",
              href:"#modal1",
              onclick:function(){
                $('#modal1').openModal();
              },
              config:function(){
                $('.modal-trigger').leanModal();
              }
            },"Save Video"),
            modalMaker({
              id:"modal1",
              class:"modal",
              body:inputForm
            })
          ])
        ]),
        m("table",[
          m("thead",[
            m("tr",[
              m("th","Name"),
              m("th","Category")
            ])
          ]),
          m("tbody",[
            ctrl.videos.map(function(video){
              return m("tr",[
                m("td",video.name),
                m("td",video.category)
              ])
            })
          ])
        ])
      ])
    }
  }
