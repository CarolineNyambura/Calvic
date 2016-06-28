var videosDb = [{
    name:"camic sans"
  },{
    name:"camic red"
  },{
    name:"camic blue"
  },{
    name:"camic green"
  }
]

function modalMaker(ctrl, args) {
  return m("." + argument.class,{
    id:argument.id
  },[
    m("div",[
        m("p","this is an aweosme miuytoiodal"),
        m(args.body)
    ])
  ])
}

var inputForm = {
  controller:function(){
    return {
      name:m.prop()
    }
  },
  view:function (ctrl, args) {
    // body...
    return m("form",{
      onsubmit:function(){
        console.log("i have been d=mhnbvlij")
      }
    },[
      m("input",{
              placeholder:"name",
              oninput: m.withAttr("value",ctrl.name),
              value:ctrl.name()
      })
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
    return m("div",[
      m(".row",[
          m("br"),
        m(".col l6",m("h4","Current videos")),
        m(".col l6",[
          m("br"),
          m("a",{
            class:"btn right modal-trigger",
            href:"#modal1",
            config:function(){
              $('.modal-trigger').leanModal();
            }
          },"New Videos"),
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
            m("th","name"),
            m("th","name"),
            m("th","name"),
            m("th","name")
          ])
        ]),
        m("tbody",[
          ctrl.videos.map(function(video){
            return m("tr",[
              m("td",video.name)
            ])
          })

        ])
      ])
    ])
  }
}
