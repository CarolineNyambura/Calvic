function sidebutton(args){
  return m("div",{class:"containerx"},[
    m("div",{class:"card hoverable"},[
      m("",{class:"args.icon"},[
        m("a",{
          href:"#",
          onclick:function(){
            console.log("i have been selected"),
            args.buttonClick()
          }
        },args.name)
      ])
    ])
  ])
}

// sidebar
var sidebar = {
  view:function(){
    return m("ul",{id:"slide-out",class:"side-nav fixed center"},[
      m("br"),
      m("div",{class:"container"},[
        m("div",{class:"containerx black-text"},[
          m("h5","CALVIC LIBRARY"),

          // videos catalogue
          m("br"),
          sidebutton({
            name:"Video Catalogue",
            icon:"large mdi-action-view-carousel",
            buttonClick:function(){
              m.route("/videos")
            }
          }),
          sidebutton({
            name:"Borrowed Videos",
            icon:"large mdi-social-domain",
            buttonClick:function(){
              m.route("/borrowed")
            }
          }),
          sidebutton({
            name:"Returned Videos",
            icon:"large mdi-action-trending-up",
            buttonClick:function(){
              m.route("/returned")
            }
          }),
          sidebutton({
            name:"Your Billings",
            icon:"large mdi-action-account-balance-wallet",
            buttonClick:function(){
              m.route("/billing")
            }
          }),
          sidebutton({
            name:"Registration",
            icon:"large mdi-action-account-balance-wallet",
            buttonClick:function(){
              m.route("/registration")
            }
          })
        ])
      ])
    ])
  }
}
