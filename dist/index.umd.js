(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.simplePaginator = {}));
}(this, (function (exports) { 'use strict';

    var convertHexUnitTo255 = function convertHexUnitTo255(hexStr) {
      return parseInt(hexStr.repeat(2 / hexStr.length), 16);
    }; // 8 digit hex isn't supported by all browsers, convert to rgba.
    // Works for 3, 4, 6, and 8 digit hex.


    function hexToRGBA(hex) {
      if (hex.charAt(0) === "#") hex = hex.slice(1);
      var isHex = /^([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

      if (isHex) {
        // Needed to break the hex down if it's a multiple of 2 or 3.
        var chunkSize = Math.floor(hex.length / 3); // Gets array, 'ff7700cc' will be ['ff', '77', '00', 'cc'];

        var hexArr = hex.match(new RegExp(".{".concat(chunkSize, "}"), "g")); // Convert hex chunk to rgb 255 val.
        // @ts-ignore - RegExp match() has a return type of RegExpMatchArray | null, but in this case it can't be null

        var arr = hexArr.map(convertHexUnitTo255); // Converts alpha 255 into number between 0 and 1 with three significant figures.

        var alpha = arr[3] || arr[3] === 0 ? (arr[3] / 255).toFixed(2) : 1;
        return "rgba(".concat(arr[0], ", ").concat(arr[1], ", ").concat(arr[2], ", ").concat(alpha, ")");
      }

      return new Error("Value provided to hexToRGBA is not a valid hex string.");
    }

    exports.hexToRGBA = hexToRGBA;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
