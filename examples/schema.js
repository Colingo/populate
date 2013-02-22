var Schema = require("../schema")
var html = require("unpack-html")
var document = require("global/document")

var template = require("./templates/simple.html")

var populate = Schema({
    text: "text"
    , link: "href"
})

var elements = populate(html(template), {
    text: "some text goes in span!"
    , link: "http://google.com"
})

document.body.appendChild(elements.root)
