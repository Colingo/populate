var bind = require("../bind")
var html = require("unpack-html")
var document = require("global/document")

var template = require("./templates/bind.html")

var elements = bind(html(template), {
    text: "some (binding) text goes in span!"
    , link: "http://google.com"
})

document.body.appendChild(elements.root)
