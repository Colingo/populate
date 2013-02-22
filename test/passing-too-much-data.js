var test = require("tape")
var html = require("unpack-html")

var template = require("./templates/nested-bind")
var bind = require("../bind")

test("binding data that doesn't exist", function (assert) {
    var elements = html(template)

    elements = bind(elements, {
        author: {
            name: "foobar"
            , imageUri: "http://google.com/"
        }
        , junk: "data"
    })

    assert.equal(elements.author.name.textContent, "foobar")
    assert.equal(elements.author.imageUri.src, "http://google.com/")

    assert.end()
})
