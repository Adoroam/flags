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
Object.defineProperty(exports, "__esModule", { value: true });
exports.flags = void 0;
var util_1 = require("./util");
var flag_types_1 = require("./flag.types");
var tokenize_1 = require("./tokenize");
var _a = process.argv, args = _a.slice(2);
var spendTokens = function (acc, _a, i, tokenized) {
    var _b;
    var tType = _a.tType, tValue = _a.tValue;
    var next = tokenized[i + 1];
    var getValue = function () { return (!next.tType ? next.tValue : 1); };
    switch (tType) {
        case flag_types_1.TType.SINGLE:
            var singlesArr = tValue.split('').map(function (l) { return [l, getValue()]; });
            var output = Object.fromEntries(singlesArr);
            return __assign(__assign({}, acc), output);
        case flag_types_1.TType.DOUBLE:
            return __assign(__assign({}, acc), (_b = {}, _b[tValue] = getValue(), _b));
        default:
            return acc;
    }
};
exports.flags = function (arr) {
    if (arr === void 0) { arr = args; }
    return !util_1.hasFlags(arr) ? {} : tokenize_1.tokenize(arr).reduce(spendTokens, {});
};
exports.default = exports.flags();
