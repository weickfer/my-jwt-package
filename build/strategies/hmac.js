"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HmacSignature = void 0;

var _nodeCrypto = require("node:crypto");

var _buffer = require("../utils/buffer");

var _base = require("../utils/base64");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var HmacSignature = /*#__PURE__*/function () {
  function HmacSignature() {
    _classCallCheck(this, HmacSignature);
  }

  _createClass(HmacSignature, [{
    key: "signer",
    value: function signer(bits) {
      return function (input, secret) {
        var signature = (0, _nodeCrypto.createHmac)("sha".concat(bits), secret).update(input).digest('base64');
        return (0, _base.fromBase64)(signature);
      };
    }
  }, {
    key: "verifier",
    value: function verifier(bits) {
      var signer = this.signer(bits);
      return function (input, signature, secret) {
        var computedSignature = signer(input, secret);
        return (0, _buffer.secureCompare)(computedSignature, signature);
      };
    }
  }]);

  return HmacSignature;
}();

exports.HmacSignature = HmacSignature;