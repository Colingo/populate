var test = require("tape")
var html = require("unpack-html")

var simpleTemplate = require("./templates/simple")
var nestedTemplate = require("./templates/nested")
var Schema = require("../schema")
var property = require("../property")

test("schema is a function", function (assert) {
    assert.equal(typeof Schema, "function")
    assert.equal(typeof Schema({}), "function")
    assert.end()
})

test("can populate data onto schema", function (assert) {
    var schema = Schema({
        "img": "src"
        , "h1": "text"
        , "span": "text"
    })

    var elements = html(simpleTemplate)
    schema(elements, {
        "img": "http://google.com/"
        , "h1": "two"
        , "span": "three"
    })

    assert.equal(elements.img.src, "http://google.com/")
    assert.equal(elements.h1.textContent, "two")
    assert.equal(elements.span.textContent, "three")
    assert.end()
})

test("can populate nested data onto schema", function (assert) {
    var schema = Schema({
        message: "text"
        , author: {
            name: "text"
            , imageUri: "src"
        }
    })

    var elements = html(nestedTemplate)
    schema(elements, {
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

test("can do comma seperated", function (assert) {
    var schema = Schema({
        author: {
            imageUri: "src, title"
        }
    })

    var elements = html(nestedTemplate)
    schema(elements, {
        author: {
            imageUri: "http://google.com/"
        }
    })

    assert.equal(elements.author.imageUri.src, "http://google.com/")
    assert.equal(elements.author.imageUri.title, "http://google.com/")
    assert.end()
})

test("can do arrays", function (assert) {
    var schema = Schema({
        author: {
            imageUri: [
                function (value, elem) {
                    elem.src = "http://google.com/" + value
                }
                , property("textContent", "name")
            ]
        }
    })

    var elements = html(nestedTemplate)
    schema(elements, {
        author: {
            imageUri: "foobar"
        }
    })

    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.equal(elements.author.name.textContent, "foobar")
    assert.end()
})
