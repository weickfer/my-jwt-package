"use strict";
exports.__esModule = true;
exports.safeJsonParse = exports.hasObject = exports.deleteFalsyFields = void 0;
function deleteFalsyFields(obj) {
    for (var key in obj) {
        if (!obj[key]) {
            delete obj[key];
        }
    }
    return obj;
}
exports.deleteFalsyFields = deleteFalsyFields;
function hasObject(thing) {
    return typeof thing === 'object' && thing !== null;
}
exports.hasObject = hasObject;
function safeJsonParse(thing) {
    if (hasObject(thing)) {
        return thing;
    }
    try {
        return JSON.parse(thing);
    }
    catch (_a) {
        return undefined;
    }
}
exports.safeJsonParse = safeJsonParse;
