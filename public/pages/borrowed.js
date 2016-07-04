  var borrowedDb = [{
      name:"final destination",
      category:"horror",
      dateBorrowed:"29-06-016",
      dateOfReturn:"01-07-016"
    },
    {
      name:"flying monkey",
      category:"horror",
      dateBorrowed:"30-06-016",
      dateOfReturn:"03-07-016"
    },
    {
      name:"jippers creepers",
      category:"horror",
      dateBorrowed:"01-07-016",
      dateOfReturn:"03-07-016"
    },
    {
      name:"mirror",
      category:"horror",
      dateBorrowed:"02-07-016",
      dateOfReturn:"05-07-016"
    },
    {
      name:"a thousand ways to die",
      category:"horror",
      dateBorrowed:"03-07-016",
      dateOfReturn:"07-07-016"
    },
  ]
  // input for the modal
  function modalMaker(argument) {
    return m("." + argument.class,{
      id:argument.id
    },[
      m("div",[
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
  // main function
  var inputForm = {
    controller:function(){
      return {
        name:m.prop(""),
        category:m.prop(""),
        dateBorrowed:m.prop(""),
        dateOfReturn:m.prop("")
      }
    },
    view:function (ctrl, args) {
  // body...
  return m("form",{
    class:"container",
    onsubmit:function(e){
      console.log("i have been selected")
      borrowedDb.push({
        name:ctrl.name(),
        category:ctrl.category(),
        dateBorrowed:ctrl.dateBorrowed(),
        dateOfReturn:ctrl.dateOfReturn()
      }),
      $('#modal2').closeModal();
      e.preventDefault();
    }
  },[
    input({
      placeholder:"name",
      oninput: m.withAttr("value",ctrl.name),
      value:ctrl.name
    }),
    input({
      placeholder:"category",
      oninput: m.withAttr("value",ctrl.category),
      value:ctrl.category
    }),
    input({
      placeholder:"dateBorrowed",
      oninput: m.withAttr("value",ctrl.dateBorrowed),
      value:ctrl.dateBorrowed
    }),
    input({
      placeholder:"dateOfReturn",
      oninput: m.withAttr("value",ctrl.dateOfReturn),
      value:ctrl.dateOfReturn
    })
  ])
}
}
  var borrowed  = {
    controller:function(){
      return {
        videos:borrowedDb
      }
    },
    view:function(ctrl, args){
      console.log(ctrl.videos)
      return m("div",{class:"container"},[
        m(".row",[
          m("br"),
          m(".col l6",
          m("h5",{class:"header"},"The following is the list of borrowed videos")),
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
            },"Save Video"),
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
              m("th","Name"),
              m("th","Category"),
              m("th","dateBorrowed"),
              m("th","dateOfReturn")
            ])
          ]),
          m("tbody",[
            ctrl.videos.map(function(video){
              return m("tr",[
                m("td",video.name),
                m("td",video.category),
                m("td",video.dateBorrowed),
                m("td",video.dateOfReturn)
              ])
            })
          ])
        ])
      ])
    }
  }
