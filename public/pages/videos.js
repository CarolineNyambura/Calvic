function input(argument) {
  return m("input", {
    class: argument.size,
    placeholder: argument.placeholder,
    oninput: m.withAttr("value", argument.value),
    value: argument.value()
  })
}

var inputFormVideos = {
  controller: function() {
    return {
      id: m.prop(""),
      name: m.prop(""),
      category: m.prop(""),
      price: m.prop(""),
      fields: {
        name: m.prop(false),
      }
    }
  },
  view: function(ctrl, args) {
    // body...
    return m("div", [
      m(".modal-header", [
        m("h5", "Input a new video")
      ]),

      m("form", {
        class: "container",
        onsubmit: function(e) {
          videosDb.push({
              id: ctrl.id(),
              name: ctrl.name(),
              category: ctrl.category(),
              price: ctrl.price(),
            }),
            $('#modal1').closeModal();
          e.preventDefault();
        }
      }, [
        m(".input-field", [

          input({
            size: "col l12",
            placeholder: "name",
            oninput: m.withAttr("checked", ctrl.name),
            value: ctrl.name
          }),

          input({
            size: "col l12",
            placeholder: "category",
            oninput: m.withAttr("checked", ctrl.category),
            value: ctrl.category
          }),

          input({
            size: "col l12",
            placeholder: "Price",
            oninput: m.withAttr("checked", ctrl.price),
            value: ctrl.price
          })
        ]),


      ]),

      m(".modal-footer", [
        m("btn", {
          class: "btn",
          type: "submit",
          onclick: function(e) {


            m.request({
              method: "post",
              url: api + "/videos/" + ctrl.name() + "/" + ctrl.category() + "/" + ctrl.price()
            }).then(function(res) {
              m.route(m.route())
              $('#modalInput').closeModal();
            }, function(err) {
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

var videos = {
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
          m("a", {
            class: "btn right",
            href: "#modal1",
            onclick: function() {
              $('#modalInput').openModal();
            },
            config: function() {
              $('.modal-trigger').leanModal();
            }
          }, "Add New Video"),
          modalMaker({
            id: "modalInput",
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
            m("th", "Category"),
            m("th", "Price")
          ])
        ]),
        m("tbody", [
          ctrl.videos().map(function(video) {
            return m("tr", [
              m("td", video.id),
              m("td", video.name),
              m("td", video.category),
              m("td", "Ksh. " + video.price),
              m("td", [
                m("buttons",{
                  class:"btn",
                  onclick:function(){
                    m.request({
                      method:"delete",
                      url: api + "/videos/" + video.id
                    }).then(function(){
                      m.route( m.route())
                    })
                  }
                },"remove")
              ])
            ])
          })
        ])
      ])
    ])
  }
}