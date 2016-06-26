// navbar
  var navbar = {
    view:function(){
      return m("nav",{class:"teal"},[
        m("div",{class:"nav-wrapper conatiner"},[
          m("ul",{id:"nav-mobile",class:"right hide-on-med-and-down"},[
            m("li",[
              m("div",{class:"chip dropdown button","data-activates":"dropdown1"})
            ])
          ])
        ])
      ])
    }
  }
