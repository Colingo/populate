var funx = [
function () {
<div id="my-template">
    <span data-marker="text"></span>
    <a data-marker="link"> some link! </a>
</div>
},
function () {
var Schema = require("populate/schema")
var unpack = require("unpack-element")

var populate = Schema({
    text: "textContent"
    , link: "href"
})

var elements = unpack(document.getElementById("my-template").cloneNode(true))

populate(elements, {
    text: "some text goes in span!"
    , link: "http://google.com"
})

document.body.appendChild(elements.root)
},
function () {
<div id="my-template">
    <span data-bind="text"></span>
    <a data-bind="href:link"> some link! </a>
</div>
},
function () {
var bind = require("populate/bind")

var rootElem = document.getElementById("my-template").cloneNode(true)

bind(rootElem, {
    text: "some text goes in span!"
    , link: "http://google.com"
})

document.body.appendChild(rootElem)
},
function () {
<!-- ./template.html -->
<div>
    <div data-bind="someText"></div>
    <div>
        <a data-bind="href:someLink, text:someText"></a>
    </div>
    <div>
        <textarea data-bind="value:nested.value"></textarea>
    </div>
    <ul data-marker="name">
        <li>I'm a nested template or something</li>
    </ul>
</div>
},
function () {
var html = require("unpack-html")
var bind = require("populate/bind")

var template = require("./template.html")

// Generate an object of DOM element references to populate
// You can use something other then unpack-html!
var elements = html(template)
var data = {
    someText: "this is some text"
    , someLink: "http://google.com"
    , nested: {
        value: "you can render nested things"
    }
    , name: [
        "one"
        , "two"
        , "three"
    ]
}

bind(elements, data, {
    // Custom logic. Mappings are just functions, do anything
    // you want!
    name: function (value, elem) {
        var tmpl = elem.firstElementChild
        elem.removeChild(tmpl)

        value.forEach(function (text) {
            var clone = tmpl.cloneNode(true)
            clone.textContent = text
            elem.appendChild(clone)
        })
    }
})

document.body.appendChild(elements.root)
}
];
