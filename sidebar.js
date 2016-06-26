function sidebutton(args){
  return m("div",{class:"containerx"},[
    m("div",{class:"card hoverable"},[
      m("",{class:"args.icon"},[
        m("a",{href:"#"},args.name)
      ])
    ])
  ])
}
function sidebutton(args){
  return m("div",{class:"containerm"},[
    m("div",{class:"card hoverable"},[
      m("",{class:"args.icon"},[
        m("a",{href:"#"},args.name)
      ])
    ])
  ])
}
function sidebutton(args){
  return m("div",{class:"containerm"},[
    m("div",{class:"card hoverable"},[
      m("",{class:"args.icon"},[
        m("a",{href:"#"},args.name)
      ])
    ])
  ])
}
function sidebutton(args){
  return m("div",{class:"containerm"},[
    m("div",{class:"card hoverable"},[
      m("",{class:"args.icon"},[
        m("a",{href:"#"},args.name)
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
            icon:"large mdi-action-view-carousel"
          }),
          sidebutton({
            name:"Borrowed Videos",
            icon:"large mdi-social-domain"
          }),
          sidebutton({
            name:"Returned Videos",
            icon:"large mdi-action-trending-up"
          }),
          sidebutton({
            name:"Your Billings",
            icon:"large mdi-action-account-balance-wallet"
          })

        ])
      ])
    ])
  }
}
