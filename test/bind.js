var test = require("tape")
var html = require("unpack-html")
var fold = require("reducers/fold")

var simpleTemplate = require("./templates/simple-bind")
var nestedTemplate = require("./templates/nested-bind")
var commaTemplate = require("./templates/comma-bind")
var multiTemplate = require("./templates/multi-bind")
var bind = require("../bind")

test("simple bind", function (assert) {
    var elements = html(simpleTemplate)
    fold(bind(elements, {
        "img": "http://google.com/"
        , "h1": "two"
        , "span": "three"
    }))

    var h1 = elements.span.previousElementSibling

    assert.equal("h1" in elements, false)
    assert.equal(elements.img.src, "http://google.com/")
    assert.equal(h1.textContent, "two")
    assert.equal(elements.span.textContent, "three")
    assert.end()
})

test("nested bind", function (assert) {
    var elements = html(nestedTemplate)
    fold(bind(elements, {
        message: "hello world"
        , author: {
            name: "Jake"
            , imageUri: "http://google.com/foobar"
        }
    }))

    assert.equal(elements.message.textContent, "hello world")
    assert.equal(elements.author.name.textContent, "Jake")
    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.end()
})

test("comma seperated bind", function (assert) {
    var elements = html(commaTemplate)
    fold(bind(elements, {
        author: {
            imageUri: "http://google.com/"
        }
    }))

    assert.equal(elements.author.imageUri.src, "http://google.com/")
    assert.equal(elements.author.imageUri.title, "http://google.com/")
    assert.end()
})

test("can bind same data to multiple places", function (assert) {
    var elements = html(multiTemplate)
    fold(bind(elements, {
        foo: {
            message: "hello"
        }
    }))

    assert.equal(elements.first.src, "hello")
    assert.equal(elements.second.textContent, "hello")
    assert.end()
})

test("can overwrite schema programmatically", function (assert) {
    var elements = html(nestedTemplate)
    fold(bind(elements, {
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
    }))

    assert.equal(elements.message.textContent, "hello world")
    assert.equal(elements.author.name.textContent, "Jake")
    assert.equal(elements.author.name.foo, "hello world")
    assert.equal(elements.author.name.bar, "Jake")
    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.end()
})
