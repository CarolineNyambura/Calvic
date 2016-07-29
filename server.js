var koa = require('koa');
var app = koa()

// $ serve files, setup
var views = require("co-views");
var serve = require('koa-static');
var render = views("public", {
  map: {
    html: 'swig'
  }
});
var router = require('koa-router')();

//$ setup logic to log when the request is done
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Responce-Time',ms + "ms")
});

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s',this.method,this.url,ms)
})

// $ make the folder public
app.use(serve(__dirname + "/public"));

// $ setup the router to respond with a html file
router.all('/', function *(next) {
  this.body = yield render("welcome/index.html");
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// setup ports for openshift
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8081;

//start the server
app.listen(port,ipaddress,function(err){
  console.log("Magic happening on %s",port)
})
