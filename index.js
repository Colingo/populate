var keys = Object.keys

module.exports = populate

function populate(data, elements, mapping) {
    keys(mapping).forEach(applyMapping)

    return elements

    function applyMapping(prop) {
        var value = data[prop]
            , map = mapping[prop]

        if (typeof map === "object") {
            populate(value, elements, map)
        } else if (Array.isArray(map)) {
            map.forEach(function () {
                fn(value, elements[prop], elements)
            })
        } else {
            map(value, elements[prop], elements)
        }
    }

    function callFn(fn) {
        fn(this.value, elements[this.prop], elements)
    }
}
