var walk = require("dom-walk")
var DataSet = require("data-set")
var inspect = require("util").inspect
var dotty = require("dotty")
var DeepMerge = require("deep-merge")
var extend = require("xtend")
var put = dotty.put
var get = dotty.get

var Schema = require("./schema")
var property = require("./property")

var deepmerge = DeepMerge(function (a, b) {
    return [].concat(a, b)
})

var deepcopy = DeepMerge(function (a, b) {
    return b
})

module.exports = bind

function bind(elements, input, mapping) {
    if (!elements.root) {
        elements = { root: elements }
    }

    elements = deepcopy({}, elements)

    var results = parse(elements.root, elements)
    elements = extend(elements, results.elements)
    mapping = deepmerge(results.mapping, mapping || {})
    return Schema(mapping)(elements, input)
}

function parse(rootElem, elements) {
    var elements = extend({}, elements)
    var mapping = {}

    walk([rootElem], function (elem) {
        var ds = DataSet(elem)

        if (ds.bind) {
            var binding = ds.bind
            var bindings = binding.split(",").map(trim)

            bindings.forEach(function (binding) {
                applyBinding(elem, binding)
            })
        }
    })

    return { mapping: mapping, elements: elements }

    function applyBinding(elem, binding) {
        var parts = binding.split(":").map(trim)
        if (parts.length === 1) {
            parts = ["textContent", parts[0]]
        }

        var prop = parts[0]
        var path = parts[1]
        var existingElem = get(elements, path)
        var hasDifferentElem = existingElem && existingElem !== elem
        /* If this path already has an element then it means
            that there are two elements which want a single
            piece of data to be rendered there.

            What we do is generate a unique element path by
            postfixing ~ to it

        */
        var elemPath = hasDifferentElem ? path + "~" : path
        put(elements, elemPath, elem)

        /* There is already an element at this path. Which
            means we need to change the mapping to be

            {
                path: [
                    whatever, is, already, here
                    , property(prop, elemPath.split('.')[last])
                ]
            }

        */
        if (hasDifferentElem) {
            var elemPathPieces = elemPath.split(".")
            var lastPiece = elemPathPieces[elemPathPieces.length - 1]
            prop = property(prop, lastPiece)
        }

        prop = addProp(path, prop)
        put(mapping, path, prop)
    }

    function addProp(path, prop) {
        var existingProp = get(mapping, path)
        if (existingProp) {
            if (!Array.isArray(existingProp)) {
                existingProp = [existingProp]
            }

            prop = existingProp.concat(prop)
        }

        return prop
    }
}

function trim(str) {
    return str.trim()
}
