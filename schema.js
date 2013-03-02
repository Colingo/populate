var expand = require("reducers/expand")

var Render = require("./render")

module.exports = Schema

function Schema(mapping) {
    var render = Render(mapping)

    return schema

    function schema(elements, input) {
        return expand(input, function (data) {
            return render(data, elements)
        })
    }
}
