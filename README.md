# populate

Populate DOM elements with data

## Population Example

The idea is that you take a pair of data and DOM elements and
    apply a mapping from the data onto the DOM.

```html
<!-- ./template.html -->
<div>
    <div id="someText"></div>
    <div>
        <a id="someLink">I am a link</a>
    </div>
    <div>
        <textarea id="different"></textarea>
    </div>
    <ul id="name">
        <li>Im a nested template or something</li>
    </ul>
</div>
```

```js
var html = require("unpack-html")

    , populate = require("populate")
    , property = require("populate/property")
    , textContent = require("populate/textContent")
    , template = require("./template.html")

// Generate an object of DOM element references to populate
// You can use something other then unpack-html!
var elements = html(template)
var data = {
    someText: "this is some text"
    , someLink: "http://google.com"
    , value: "you can map to other elements"
    , name: [
        "one"
        , "two"
        , "three"
    ]
}

populate(data, elements, {
    someText: textContent
    , someLink: property("href")
    , value: property("value", "different")
    // Custom logic. Mappings are just functions, do anything
    // you want!
    , name: function (value, elem, elements) {
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
```

## Stream example

```html
<!-- ./template.html -->
<div>
    <div>Name: <span id="name"></span></div>
    <div>Value: <span id="value"></span></div>
</div>
```

```js
/*global document*/
var html = require("unpack-html")

    , PopulateStream = require("../../stream")
    , textContent = require("../../textContent")
    , template = require("./template.html")

var elements = html(template)
var stream = PopulateStream(elements, {
    value: textContent
    , name: textContent
})

var name = "Streaming population!"
var value = 0

setInterval(function () {
    value++
    stream.write({
        name: name
        , value: value
    })
}, 500)

document.body.appendChild(elements.root)
```

## Docs



## Installation

`npm install populate`

## Contributors

 - Raynos

## MIT Licenced
