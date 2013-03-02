var test = require("tape")
var html = require("unpack-html")
var fold = require("reducers/fold")

var template = require("./templates/merging-bind")
var bind = require("../bind")

test("bind does not clobber elements", function (assert) {
    var elements = html(template)

    fold(bind(elements, {
        value: 42
    }))

    assert.equal(elements.value.tagName, "SPAN")
    assert.equal(elements._value.tagName, "DIV")

    assert.end()
})
