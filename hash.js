var inspect = require("util").inspect

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
        Object.keys(data).forEach(function (key) {
            var value = data[key]
            var elem = elements[key]
            var render = definition[key]

            if (!render) {
                throw new Error("populate/hash: There is no " +
                    "rendering definition for property " + key +
                    " of data " + inspect(data))
            }

            render(value, elem, elements)
        })
    }
}
