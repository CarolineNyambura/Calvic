function input(argument) {
  return m("input", {
    class: argument.size,
    placeholder: argument.placeholder,
    oninput: m.withAttr("value", argument.value),
    value: argument.value()
  })
}


var payForm = {
  controller: function() {
    return {
      ammount: m.prop(0),
      id: m.prop(""),
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
        m("h5", "Enter a new payment ammount")
      ]),

      m("form", {
        class: "container",
        onsubmit: function(e) {
            $('#modal1').closeModal();
          e.preventDefault();
        }
      }, [
        m(".input-field", [

          input({
            size: "col l12",
            placeholder: "Ammount",
            oninput: m.withAttr("checked", ctrl.ammount),
            value: ctrl.ammount
          })

        ])
      ]),

      m(".modal-footer", [
        m("btn", {
          class: "btn",
          type: "submit",
          onclick: function(e) {


            m.request({
              method:"post",
              url:api + "/pay/" + m.route.param("member_id") + "/" +  ctrl.ammount()
            }).then(function (res) {
              m.route( m.route() )
               $('#modalPay').closeModal();
            },function (err) {
              alert("err")
               $('#modal1').closeModal();
            })

             
            e.preventDefault();
          }
        }, "save"),
      ])

    ])
  }
}


var videosList = {
  controller: function() {
    return {
      videos: m.request({
        url: api + "/videos"
      })
    }
  },
  view: function(ctrl, args) {
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
          modalMaker({
            id: "modal1",
            class: "modal",
            body: inputFormVideos
          })
        ])
      ]),
      m("table", [
        m("thead", [
          m("tr", [
            m("th", "id"),
            m("th", "Name"),
            m("th", "Category")
          ])
        ]),
        m("tbody", [
          ctrl.videos().map(function(video) {
            return m("tr", [
              m("td", video.id),
              m("td", video.name),
              m("td", video.category),
              m("td", [
                m("button",{
                  class:"btn",
                  onclick:function(){
                    m.request({
                      method:"post",
                      url:api + "/lend_video/" + m.route.param("member_id") + "/" + video.id + "/" + video.name + "/" + video.category
                    }).then(function (res) {
                      m.route( m.route( ))
                      $('#modal1').closeModal();
                    },function (err) {
                      alert(err)
                      $('#modal1').closeModal();
                    })
                  }
                },"Lend")
              ])
            ])
          })
        ])
      ])
    ])
  }
}

var memberDetailsComponent = {
  controller: function() {
    return {
      videos: m.request({
        url: api + "/borrowed_videos/" + m.route.param("member_id")
      }),
      returned: m.request({
        url: api + "/returned_videos/" + m.route.param("member_id")
      }),
      payments: m.request({
        url: api + "/payments/" + m.route.param("member_id")
      })
    }
  },
  view: function(ctrl, args) {
    return m("div", {
      class: "container"
    }, [

    // borrowed vids
      m(".row", [
        m("br"),
        m(".col l6", m("h5", {
          class: "header"
        }, "Borrowed")),
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
          }, "Lend new video"),
          modalMaker({
            id: "modal1",
            class: "modal",
            body: videosList
          })
        ])
      ]),


      m("table", [
        m("thead", [
          m("tr", [
            m("th", "id"),
            m("th", "Name"),
            m("th", "Category")
          ])
        ]),
        m("tbody", [
          ctrl.videos().map(function(video) {
            return m("tr", [
              m("td", video.id),
              m("td", video.video_name),
              m("td", video.video_category),
              m("td", [
                m("button",{
                  class:"btn",
                  onclick:function(){
                    m.request({
                      url:api + "/return_video/" + video.video_id
                    }).then(function(){
                      m.route( m.route( ) )
                    })
                  }
                },"return")
              ])
            ])
          })
        ])
      ]),


      // returned vids
      m(".row", [
        m("br"),
        m(".col l6", m("h5", {
          class: "header"
        }, "Returned"))
      ]),


      m("table", [
        m("thead", [
          m("tr", [
            m("th", "id"),
            m("th", "Name"),
            m("th", "Category")
          ])
        ]),
        m("tbody", [
          ctrl.returned().map(function(video) {
            return m("tr", [
              m("td", video.id),
              m("td", video.name),
              m("td", video.category)
            ])
          })
        ])
      ]),


      // billing vids
      m(".row", [
        m("br"),
        m(".col l6", m("h5", {
          class: "header"
        }, "billing"))
      ]),


      m("table", [
        m("thead", [
          m("tr", [
            m("th", "id"),
            m("th", "Name"),
            m("th", "Category")
          ])
        ]),
        m("tbody", [
          ctrl.videos().map(function(video) {
            return m("tr", [
              m("td", video.id),
              m("td", video.name),
              m("td", video.category)
            ])
          })
        ])
      ]),



      // payments
      m(".row", [
        m("br"),
        m(".col l6", m("h5", {
          class: "header"
        }, "Payments")),
        m(".col l6", [
          m("br"),
          m("a", {
            class: "btn right",
            href: "#modal1",
            onclick: function() {
              $('#modalPay').openModal();
            },
            config: function() {
              $('.modal-trigger').leanModal();
            }
          }, "Add new payment"),
          modalMaker({
            id: "modalPay",
            class: "modal",
            body: payForm
          })
        ])
      ]),


      m("table", [
        m("thead", [
          m("tr", [
            m("th", "Sate"),
            m("th", "Ammount"),
          ])
        ]),
        m("tbody", [
          ctrl.payments().map(function(video) {
            return m("tr", [
              m("td", new Date(video.createdAt).toUTCString()),
              m("td", video.ammount)
            ])
          })
        ])
      ])


    ])
  }
}