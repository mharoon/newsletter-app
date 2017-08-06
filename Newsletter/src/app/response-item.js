"use strict";
var ResponseItem = (function () {
    function ResponseItem() {
    }
    return ResponseItem;
}());
exports.ResponseItem = ResponseItem;
var STATUS_CODE;
(function (STATUS_CODE) {
    STATUS_CODE[STATUS_CODE["Error"] = 0] = "Error";
    STATUS_CODE[STATUS_CODE["Success"] = 1] = "Success";
    STATUS_CODE[STATUS_CODE["DuplicateEmail"] = 2] = "DuplicateEmail";
})(STATUS_CODE = exports.STATUS_CODE || (exports.STATUS_CODE = {}));
exports.STATUS_MSG = Object.freeze({
    Error: "There is some error in processing the request. Please try again.!",
    Success: "Thank You for Subscribing!"
});
//# sourceMappingURL=response-item.js.map