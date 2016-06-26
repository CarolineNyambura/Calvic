  var videoDb = [{
    id:"1",
    name:"single ladies",
    category:"thriller"
  },
  {
    id:"2",
    name:"two broke girls",
    category:"comedy"

  }
]
  var videoList = {
    view:function(ctrl,args){
      return m("table",{border:"1"},[
        m("thead",[
          m("tr",[
            m("th","id"),
            m("th","name"),
            m("th","category")
          ])
        ]),
        m("tbody",[
          args.videos.map(function(video){
            return m("tr",[
              m("td",video.id),
              m("td",video.name),
              m("td",video.category)
            ])
          })
        ])
      ])
    }
  }
  var videoInput = {
    controller:function(){
      return {
        id:m.prop("1"),
        name:("single ladies"),
        category:("thriller")
      }
    },
    view:function(ctrl,args){
      return m("div",[
        m("input",{
          oninput:m.withAttr("value",ctrl.name)
        }),
        m("input",{
          oninput:m.withAttr("value",ctrl.category)
        }),
        m("button",{
        onclick:function(){
          console.log("selected")
          videoDb.push({
            id:ctrl.id(),
            name:ctrl.name,
            category:ctrl.category
          })
        }
      },"save")
    ])
    }
  }
  var page = {
    view:function(){
      return m(".project",[
        m.component(videoInput),
        m.component(videoList,{
          videos:videoDb
        })
      ])
    }
  }
  m.mount(document.body, page)
