  var borrowed = [{
      name:"final destination",
      category:"horror",
      dateBorrowed:"28-06-016",
      dateOffReturn:"31-06-016"
    },
    {
      name:"flying monkey",
      category:"horror",
      dateBorrowed:"28-06-016",
      dateOffReturn:"31-06-016"
    },
    {
      name:"jippers creepers",
      category:"horror",
      dateBorrowed:"28-06-016",
      dateOffReturn:"31-06-016"
    },
    {
      name:"mirror",
      category:"horror",
      dateBorrowed:"28-06-016",
      dateOffReturn:"31-06-016"
    },
    {
      name:"a thousand ways to die",
      category:"horror",
      dateBorrowed:"28-06-016",
      dateOffReturn:"31-06-016"
    },
  ]
  var videoInput = {
    controller:function(){
      return {
        name:m.prop(""),
        category:m.prop(""),
        dateBorrowed:m.prop(""),
        dateOffReturn:m.prop(""),
      }
    },
  view:function(ctrl,args){
    return m("form",{
      onsubmit:function(e){
        console.log("i have been selected")
        borrowed.push({
          name:ctrl.name(),
          category:ctrl.category(),
          dateBorrowed:ctrl.dateBorrowed(),
          dateOffReturn:ctrl.dateOffReturn(),
        }),
        $('#modal2').closeModal();
        e.preventDefault();
      }
    },[
    input({
      placeholder:"name",
      oninput:m.withAttr("value",ctrl.name)
    }),
    m("input",{
      placeholder:"category",
      oninput:m.withAttr("value",ctrl.category)
    }),
    m("input",{
      placeholder:"dateBorrowed",
      oninput:m.withAttr("value",ctrl.dateBorrowed)
    }),
    m("input",{
      placeholder:"dateOffReturn",
      oninput:m.withAttr("value",ctrl.dateOffReturn)
    })
  ])
}
}
  var videos  = {
    controller:function(){
      return {
        videos:borrowed
      }
    },
    view:function(ctrl, args){
      console.log(ctrl.videos)
      return m("div",{class:"container"},[
        m(".row",[
          m("br"),
          m(".col l6",m("h4","the Videos Borrowed")),
          m(".col l6",[
            m("br"),
            m("a",{
              class:"btn right",
              href:"#modal2",
              onclick:function(){
                $('#modal2').openModal();
              },
              config:function(){
                $('.modal-trigger').leanModal();
              }
            },"Borrowed"),
            modalMaker({
              id:"modal2",
              class:"modal",
              body:inputForm
            })
          ])
        ]),
        m("table",[
          m("thead",[
            m("tr",[
              m("th","name"),
              m("th","category"),
              m("th","dateBorrowed"),
              m("th","dateOffReturn"),

            ])
          ]),
          m("tbody",[
            ctrl.videos.map(function(video){
              return m("tr",[
                m("td",video.name),
                m("td",video.category),
                m("td",video.dateBorrowed),
                m("td",video.dateOffReturn)
              ])
            })
          ])
        ])
      ])
    }
  }
