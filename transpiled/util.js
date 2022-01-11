"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmDashes = exports.chDashes = exports.hasFlags = void 0;
var dashRegex = /^\-{1,2}/i;
var dash = function (str) { return dashRegex.test(str); };
exports.hasFlags = function (arr) { return arr.some(dash); };
exports.chDashes = function (str) {
    return !!dash(str) ? dashRegex.exec(str)[0].length : 0;
};
exports.rmDashes = function (str) {
    return str.replace(dashRegex, '').toLowerCase();
};
