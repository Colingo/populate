var test = require("tape")
var html = require("unpack-html")

var simpleTemplate = require("./templates/simple-bind")
var nestedTemplate = require("./templates/nested-bind")
var commaTemplate = require("./templates/comma-bind")
var multiTemplate = require("./templates/multi-bind")
var bind = require("../bind")

test("simple bind", function (assert) {
    var elements = html(simpleTemplate)
    elements = bind(elements, {
        "img": "http://google.com/"
        , "h1": "two"
        , "span": "three"
    })

    assert.equal(elements.img.src, "http://google.com/")
    assert.equal(elements.h1.textContent, "two")
    assert.equal(elements.span.textContent, "three")
    assert.end()
})

test("nested bind", function (assert) {
    var elements = html(nestedTemplate)
    elements = bind(elements, {
        message: "hello world"
        , author: {
            name: "Jake"
            , imageUri: "http://google.com/foobar"
        }
    })

    assert.equal(elements.message.textContent, "hello world")
    assert.equal(elements.author.name.textContent, "Jake")
    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.end()
})

test("comma seperated bind", function (assert) {
    var elements = html(commaTemplate)
    elements = bind(elements, {
        author: {
            imageUri: "http://google.com/"
        }
    })

    assert.equal(elements.author.imageUri.src, "http://google.com/")
    assert.equal(elements.author.imageUri.title, "http://google.com/")
    assert.end()
})

test("can bind same data to multiple places", function (assert) {
    var elements = html(multiTemplate)
    bind(elements, {
        foo: {
            message: "hello"
        }
    })

    assert.equal(elements.first.src, "hello")
    assert.equal(elements.second.textContent, "hello")
    assert.end()
})

test("can overwrite schema programmatically", function (assert) {
    var elements = html(nestedTemplate)
    elements = bind(elements, {
        message: "hello world"
        , author: {
            name: "Jake"
            , imageUri: "http://google.com/foobar"
        }
    }, {
        message: function (value, elem, elements) {
            // console.log("called?", elements.author.name.foo, value)
            elements.author.name.foo = value
        }
        , author: {
            name: "bar"
        }
    })

    assert.equal(elements.message.textContent, "hello world")
    assert.equal(elements.author.name.textContent, "Jake")
    assert.equal(elements.author.name.foo, "hello world")
    assert.equal(elements.author.name.bar, "Jake")
    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.end()
})
