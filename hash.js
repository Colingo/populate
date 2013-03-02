var inspect = require("util").inspect
var union = require("interset/union")

var Render = require("./render")

module.exports = Hash

function Hash(mapping) {
    if (typeof mapping !== "object" || mapping === null) {
        throw new Error("populate/hash: mapping should be an object")
    }

    var definition = Object.keys(mapping).
        reduce(function (acc, key) {
            acc[key] = Render(mapping[key])
            return acc
        }, {})

    return render

    function render(data, elements) {
        var keys = union(Object.keys(data), Object.keys(elements))

        keys.forEach(function (key) {
            var value = data[key]
            var elem = elements[key]
            var render = definition[key]

            if (!render) {
                return
            }

            render(value, elem, elements)
        })
    }
}
