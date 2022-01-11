"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
var util_1 = require("./util");
var flag_types_1 = require("./flag.types");
exports.tokenize = function (words) { return __spreadArrays(words.reduce(function (acc, word, index) {
    var end = acc.length - 1;
    var _a = [util_1.chDashes(word), acc[end]], tType = _a[0], last = _a[1];
    !!acc.length && !last.tType && !tType
        ? (acc[end] = __assign(__assign({}, last), { tValue: last.tValue + " " + word }))
        : (acc = __spreadArrays(acc, [{ tType: tType, tValue: util_1.rmDashes(word), index: index }]));
    return acc;
}, []), [
    { tType: flag_types_1.TType.EOL, tValue: '', index: words.length },
]); };
