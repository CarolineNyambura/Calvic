// var borrowed  = {
//   view:function(){
//     return m("div",[
//       m("div","borrowed"),
//     ])
//   }
// }
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
    input({
      placeholder:"name",
      oninput: m.withAttr("value",ctrl.name),
      value:ctrl.name
    })
  ])
}
}
var borrowed  = {
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
        m(".col l6",m("h4","Video Catalogue")),
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
