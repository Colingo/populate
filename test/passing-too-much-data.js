var test = require("tape")
var html = require("unpack-html")
var fold = require("reducers/fold")

var template = require("./templates/nested-bind")
var bind = require("../bind")

test("binding data that doesn't exist", function (assert) {
    var elements = html(template)

    fold(bind(elements, {
        author: {
            name: "foobar"
            , imageUri: "http://google.com/"
        }
        , junk: "data"
    }))

    assert.equal(elements.author.name.textContent, "foobar")
    assert.equal(elements.author.imageUri.src, "http://google.com/")

    assert.end()
})
