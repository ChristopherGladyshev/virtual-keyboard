"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElementCreater =
/*#__PURE__*/
function () {
  function ElementCreater() {
    _classCallCheck(this, ElementCreater);
  }

  _createClass(ElementCreater, null, [{
    key: "getElement",
    value: function getElement(el, classNames, child, parent) {
      var _element$classList;

      var element = null;

      try {
        element = document.createElement(el);
      } catch (error) {
        throw new Error('Unable to create HTMLElement! Give a proper tag name');
      }

      if (classNames) (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classNames.split(' '))); // 'class1 class2 class3'

      if (child && Array.isArray(child)) {
        child.forEach(function (childElement) {
          return childElement && element.appendChild(childElement);
        });
      } else if (child && _typeof(child) === 'object') {
        element.appendChild(child);
      } else if (child && typeof child === 'string') {
        element.innerHTML = child;
      } // if (childClassName) {
      //   child.classList.add(childClassName);
      // }


      if (parent) {
        parent.appendChild(element);
      }

      for (var _len = arguments.length, dataAttr = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        dataAttr[_key - 4] = arguments[_key];
      }

      if (dataAttr.length) {
        dataAttr.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              attrName = _ref2[0],
              attrValue = _ref2[1];

          if (attrValue === '') {
            element.setAttribute(attrName, '');
          }

          if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
            element.setAttribute(attrName, attrValue);
          } else {
            element.dataset[attrName] = attrValue;
          }
        });
      }

      return element;
    }
  }]);

  return ElementCreater;
}();

exports["default"] = ElementCreater;