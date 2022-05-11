"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ElementCreater = _interopRequireDefault(require("./ElementCreater"));

var _keys = _interopRequireDefault(require("../data/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard =
/*#__PURE__*/
function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.root = document.querySelector('body');
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.keyboardContainer = document.createElement('div');
    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textaria');
    this.linux = document.createElement('p');
    this.p = document.createElement('p');
    this.linux.innerHTML = 'Клавиатура создана в операционной системе Linux';
    this.p.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
    this.keyboardContainer.classList.add('keyboard');
    this.container.appendChild(this.textarea);
    this.container.appendChild(this.keyboardContainer);
    this.container.appendChild(this.linux);
    this.container.appendChild(this.p);
    this.root.appendChild(this.container);
    this.textarea.focus();
    var local = localStorage.getItem('lang');
    this.keyboardContainer.dataset.lang = local || 'ru';
    this.init();
  }

  _createClass(Keyboard, [{
    key: "init",
    value: function init() {
      this.createHtml();
      this.clikhendler();
      this.keyHendler();
    }
  }, {
    key: "clikhendler",
    value: function clikhendler() {
      var _this = this;

      this.root.addEventListener('click', function (event) {
        var target = event.target;
        var dataset = target.dataset;
        var value = _this.textarea.value;

        _this.textarea.focus();

        var end = _this.textarea.selectionEnd;
        var start = _this.textarea.selectionStart;

        if (!target.classList.contains('keyboard__key') || dataset.hot === 'true') {
          if (dataset.code === 'Tab') return _this.textarea.value = "".concat(value, "\t");
          if (dataset.code === 'Backspace') return _this.backspace(start, end, value);
          if (dataset.code === 'Enter') return _this.enter(start, end, value);
          if (dataset.code === 'Delete') return _this["delete"](start, end, value);
          if (dataset.code === 'ShiftLeft' || dataset.code === 'ShiftRight') return _this.shift();
          if (dataset.code === 'CapsLock') return _this.capsLock();
          if (dataset.code === 'ArrowLeft') return _this.arrowLeft(start);
          if (dataset.code === 'ArrowRight') return _this.arrowRight(start, value);
          return;
        }

        if (start === value.length) return _this.textarea.value = value + dataset[_this.chekLang()];
        var arr = value.split('');
        arr.splice(start, 0, dataset[_this.chekLang()]);
        var str = arr.join('');
        _this.textarea.value = str;
        _this.textarea.selectionStart = start + 1;
        _this.textarea.selectionEnd = start + 1;
      });
    }
  }, {
    key: "keyHendler",
    value: function keyHendler() {
      var _this2 = this;

      var key = document.querySelectorAll('.keyboard__key');
      var pressed = new Set();
      window.addEventListener('keydown', function (event) {
        if (event.keyCode === 9) {
          event.preventDefault();
          _this2.textarea.value = "".concat(_this2.textarea.value, "\t");
        }

        for (var i = 0; i < key.length; i++) {
          if (key[i].dataset.code == event.code) {
            key[i].classList.add('keyboard__key--active');
            break;
          }
        }

        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') _this2.shift();
        if (event.code === 'CapsLock') _this2.capsLock();

        if (event.code === 'ControlLeft' || event.code === 'AltLeft') {
          pressed.add(event.code);
          var codes = ['ControlLeft', 'AltLeft'];

          for (var _i = 0, _codes = codes; _i < _codes.length; _i++) {
            var code = _codes[_i];

            if (!pressed.has(code)) {
              return;
            }
          }

          pressed.clear();
          var lang = _this2.keyboardContainer.dataset.lang;

          if (lang === 'capsLockEn' || lang === 'en' || lang === 'eventShiftEn') {
            _this2.keyboardContainer.dataset.lang = 'ru';
            localStorage.setItem('lang', 'ru');
          } else {
            localStorage.setItem('lang', 'en');
            _this2.keyboardContainer.dataset.lang = 'en';
          }
        }
      });
      window.addEventListener('keyup', function (event) {
        pressed["delete"](event.code);

        _this2.keyboardContainer.querySelectorAll('.keyboard__key--active').forEach(function (key) {
          key.classList.remove('keyboard__key--active');
        });

        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') return _this2.shift();
      });
    }
  }, {
    key: "createHtml",
    value: function createHtml() {
      var _this3 = this;

      var classKey = 'keyboard__key';

      _keys["default"].forEach(function (row) {
        var div = document.createElement('div');
        div.classList.add('keyboard__row');
        row.forEach(function (key) {
          var capsLockEn = document.createElement('div');
          capsLockEn.classList.add('capsLockEn');
          capsLockEn.innerHTML = key.capsLockEn;
          var capsLockRu = document.createElement('div');
          capsLockRu.classList.add('capsLockRu');
          capsLockRu.innerHTML = key.capsLockRu;
          var eventShiftRu = document.createElement('div');
          eventShiftRu.classList.add('eventShiftRu');
          eventShiftRu.innerHTML = key.eventShiftRu;
          var eventShiftEn = document.createElement('div');
          eventShiftEn.classList.add('eventShiftEn');
          eventShiftEn.innerHTML = key.eventShiftEn;
          var en = document.createElement('div');
          en.classList.add('en');
          en.innerHTML = key.en;
          var ru = document.createElement('div');
          ru.classList.add('ru');
          ru.innerHTML = key.ru;
          var cssClass = key["class"] ? " ".concat(key["class"]) : '';
          div.appendChild(_ElementCreater["default"].getElement('div', "".concat(classKey).concat(cssClass), [capsLockEn, capsLockRu, en, ru, eventShiftRu, eventShiftEn], null, ['code', key.code], ['ru', key.ru], ['en', key.en], ['capsLockEn', key.capsLockEn], ['capsLockRu', key.capsLockRu], ['eventShiftRu', key.eventShiftRu], ['eventShiftEn', key.eventShiftEn], ['hot', key.hot]));
        });

        _this3.keyboardContainer.appendChild(div);
      });
    }
  }, {
    key: "backspace",
    value: function backspace(start, end, value) {
      if (start === end) {
        var arr = value.split('');
        arr[start - 1] = '';
        var str = arr.join('');
        this.textarea.value = str;
        this.textarea.selectionStart = start - 1;
        this.textarea.selectionEnd = start - 1;
        return;
      }

      this.textarea.value = value.replace(value.substring(start, end), '');
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
    }
  }, {
    key: "enter",
    value: function enter(start, end, value) {
      if (value.length === start) {
        this.textarea.value = "".concat(value, "\n");
        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
      } else if (start === end) {
        var arr = value.split('');
        arr.splice(start, 0, '\n');
        var str = arr.join('');
        this.textarea.value = str;
        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
      } else {
        var _arr = value.split('');

        var amount = end - start;

        _arr.splice(start, amount);

        _arr.splice(start, 0, '\n');

        var _str = _arr.join('');

        this.textarea.value = _str;
        this.textarea.selectionStart = start + 1;
        this.textarea.selectionEnd = start + 1;
      }
    }
  }, {
    key: "delete",
    value: function _delete(start, end, value) {
      if (start === value.length) return;

      if (start < value.length) {
        var _arr2 = value.split('');

        _arr2.splice(start, 1);

        var _str2 = _arr2.join('');

        this.textarea.value = _str2;
        this.textarea.selectionStart = start;
        this.textarea.selectionEnd = start;
        return;
      }

      var arr = value.split('');
      var amount = end - start;
      arr.splice(start, amount);
      arr.splice(start, 0, '');
      var str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
    }
  }, {
    key: "arrowLeft",
    value: function arrowLeft(start) {
      if (!start) return;
      this.textarea.selectionStart = start - 1;
      this.textarea.selectionEnd = start - 1;
    }
  }, {
    key: "arrowRight",
    value: function arrowRight(start, value) {
      if (start === value.length) return;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.isCaps) {
        if (this.keyboardContainer.dataset.lang == 'capsLockRu') return this.keyboardContainer.dataset.lang = 'eventShiftRu';
        if (this.keyboardContainer.dataset.lang == 'capsLockEn') return this.keyboardContainer.dataset.lang = 'eventShiftEn';
        if (this.keyboardContainer.dataset.lang == 'eventShiftRu') return this.keyboardContainer.dataset.lang = 'capsLockRu';
        if (this.keyboardContainer.dataset.lang == 'eventShiftEn') return this.keyboardContainer.dataset.lang = 'capsLockEn';
        return;
      }

      if (this.keyboardContainer.dataset.lang == 'ru') return this.keyboardContainer.dataset.lang = 'eventShiftRu';
      if (this.keyboardContainer.dataset.lang == 'eventShiftRu') return this.keyboardContainer.dataset.lang = 'ru';
      if (this.keyboardContainer.dataset.lang == 'en') return this.keyboardContainer.dataset.lang = 'eventShiftEn';
      if (this.keyboardContainer.dataset.lang == 'eventShiftEn') return this.keyboardContainer.dataset.lang = 'en';
    }
  }, {
    key: "chekLang",
    value: function chekLang() {
      return this.keyboardContainer.dataset.lang;
    }
  }, {
    key: "capsLock",
    value: function capsLock() {
      this.isCaps = !this.isCaps;
      if (this.keyboardContainer.dataset.lang == 'en') return this.keyboardContainer.dataset.lang = 'capsLockEn';
      if (this.keyboardContainer.dataset.lang == 'ru') return this.keyboardContainer.dataset.lang = 'capsLockRu';
      if (this.keyboardContainer.dataset.lang == 'capsLockRu') return this.keyboardContainer.dataset.lang = 'ru';
      if (this.keyboardContainer.dataset.lang == 'capsLockEn') return this.keyboardContainer.dataset.lang = 'en';
    }
  }]);

  return Keyboard;
}();

exports["default"] = Keyboard;