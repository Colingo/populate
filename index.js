var fold = require("reducers/fold")

var Render = require("./render")

module.exports = Schema

function Schema(mapping) {
    var render = Render(mapping)

    return schema

    function schema(elements, input) {
        fold(input, function (data) {
            render(data, elements)
        })
    }
}
