import ElementCreater from './ElementCreater';
import keys from '../data/keys';

export default class Keyboard {
  constructor() {
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
    this.link = 'https://github.com/ChristopherGladyshev/virtual-keyboard/pull/1';
    this.a = document.createElement('a');
    this.a.href = this.link;
    this.a.innerHTML = 'pull request';
    this.keyboardContainer.classList.add('keyboard');
    this.container.appendChild(this.textarea);
    this.container.appendChild(this.keyboardContainer);
    this.container.appendChild(this.linux);
    this.container.appendChild(this.p);
    this.container.appendChild(this.a);
    this.root.appendChild(this.container);
    this.textarea.focus();
    const local = localStorage.getItem('lang');
    this.keyboardContainer.dataset.lang = local || 'ru';
    this.init();
  }

  init() {
    this.createHtml();
    this.clikhendler();
    this.keyHendler();
  }

  clikhendler() {
    this.root.addEventListener('click', (event) => {
      const { target } = event;
      const { dataset } = target;
      const value = this.textarea.value;
      this.textarea.focus();
      const end = this.textarea.selectionEnd;
      const start = this.textarea.selectionStart;
      if (!target.classList.contains('keyboard__key') || dataset.hot === 'true') {
        if (dataset.code === 'Tab') return this.tab();
        if (dataset.code === 'Backspace') return this.backspace(start, end, value);
        if (dataset.code === 'Enter') return this.enter(start, end, value);
        if (dataset.code === 'Delete') return this.delete(start, end, value);
        if (dataset.code === 'ShiftLeft' || dataset.code === 'ShiftRight') return this.shift();
        if (dataset.code === 'CapsLock') return this.capsLock();
        if (dataset.code === 'ArrowLeft') return this.arrowLeft(start);
        if (dataset.code === 'ArrowRight') return this.arrowRight(start, value);
        return;
      }
      if (start === value.length) return this.textarea.value = value + dataset[this.chekLang()];


      const arr = value.split('');
      arr.splice(start, 0, dataset[this.chekLang()]);
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;

    });
  }

  keyHendler() {
    const key = document.querySelectorAll('.keyboard__key');
    let pressed = new Set();
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 9) {
        event.preventDefault();
        this.tab();
      }
      for (let i = 0; i < key.length; i++) {
        if (key[i].dataset.code == event.code) {
          key[i].classList.add('keyboard__key--active');
          break;
        }
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') this.shift();
      if (event.code === 'CapsLock') this.capsLock();
      if (event.code === 'ControlLeft' || event.code === 'AltLeft') {
        pressed.add(event.code);
        const codes = ['ControlLeft', 'AltLeft'];
        for (let code of codes) {
          if (!pressed.has(code)) {
            return;
          }
        }
        pressed.clear();

        const lang = this.keyboardContainer.dataset.lang;
        if (lang === 'capsLockEn' || lang === 'en' || lang === 'eventShiftEn') {
          this.keyboardContainer.dataset.lang = 'ru';
          localStorage.setItem('lang', 'ru');
        } else {
          localStorage.setItem('lang', 'en');
          this.keyboardContainer.dataset.lang = 'en';
        }

      }
    });

    window.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
      this.keyboardContainer.querySelectorAll('.keyboard__key--active').forEach((key) => {
        key.classList.remove('keyboard__key--active');
      });
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') return this.shift();
    });
  }

  createHtml() {
    const classKey = 'keyboard__key';
    keys.forEach((row) => {
      const div = document.createElement('div');
      div.classList.add('keyboard__row');

      row.forEach((key) => {

        const capsLockEn = document.createElement('div');
        capsLockEn.classList.add('capsLockEn');
        capsLockEn.innerHTML = key.capsLockEn;

        const capsLockRu = document.createElement('div');
        capsLockRu.classList.add('capsLockRu');
        capsLockRu.innerHTML = key.capsLockRu;

        const eventShiftRu = document.createElement('div');
        eventShiftRu.classList.add('eventShiftRu');
        eventShiftRu.innerHTML = key.eventShiftRu;

        const eventShiftEn = document.createElement('div');
        eventShiftEn.classList.add('eventShiftEn');
        eventShiftEn.innerHTML = key.eventShiftEn;

        const en = document.createElement('div');
        en.classList.add('en');
        en.innerHTML = key.en;

        const ru = document.createElement('div');
        ru.classList.add('ru');
        ru.innerHTML = key.ru;

        const cssClass = key.class ? ` ${key.class}` : '';
        div.appendChild(ElementCreater.getElement('div', `${classKey}${cssClass}`, [
          capsLockEn,
          capsLockRu,
          en,
          ru,
          eventShiftRu,
          eventShiftEn
        ],
        null,
        ['code', key.code],
        ['ru', key.ru],
        ['en', key.en],
        ['capsLockEn', key.capsLockEn],
        ['capsLockRu', key.capsLockRu],
        ['eventShiftRu', key.eventShiftRu],
        ['eventShiftEn', key.eventShiftEn],
        ['hot', key.hot]
        ));
      });
      this.keyboardContainer.appendChild(div);
    });
  }

  backspace(start, end, value) {
    if (start === end) {
      const arr = value.split('');
      arr[start - 1] = '';
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start - 1;
      this.textarea.selectionEnd = start - 1;
      return;
    }
    this.textarea.value = value.replace(value.substring(start, end), '');
    this.textarea.selectionStart = start;
    this.textarea.selectionEnd = start;
  }

  enter(start, end, value) {
    if (value.length === start) {
      this.textarea.value = `${value}\n`;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    } else if (start === end) {
      const arr = value.split('');
      arr.splice(start, 0, '\n');
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;

    } else {
      const arr = value.split('');
      const amount = end - start;
      arr.splice(start, amount);
      arr.splice(start, 0, '\n');
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    }
  }

  delete(start, end, value) {
    if (start === value.length) return;
    if (start < value.length) {
      const arr = value.split('');
      arr.splice(start, 1);
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
      return;
    }
    const arr = value.split('');
    const amount = end - start;
    arr.splice(start, amount);
    arr.splice(start, 0, '');
    const str = arr.join('');
    this.textarea.value = str;
    this.textarea.selectionStart = start;
    this.textarea.selectionEnd = start;
  }

  arrowLeft(start) {
    if (!start) return;
    this.textarea.selectionStart = start - 1;
    this.textarea.selectionEnd = start - 1;
  }

  arrowRight(start, value) {
    if (start === value.length) return;
    this.textarea.selectionStart = start + 1;
    this.textarea.selectionEnd = start + 1;
  }

  shift() {

    if (this.isCaps) {
      if (this.keyboardContainer.dataset.lang == 'capsLockRu')
        return this.keyboardContainer.dataset.lang = 'eventShiftRu';
      if (this.keyboardContainer.dataset.lang == 'capsLockEn')
        return this.keyboardContainer.dataset.lang = 'eventShiftEn';
      if (this.keyboardContainer.dataset.lang == 'eventShiftRu')
        return this.keyboardContainer.dataset.lang = 'capsLockRu';
      if (this.keyboardContainer.dataset.lang == 'eventShiftEn')
        return this.keyboardContainer.dataset.lang = 'capsLockEn';
      return;
    }

    if (this.keyboardContainer.dataset.lang == 'ru') return this.keyboardContainer.dataset.lang = 'eventShiftRu';
    if (this.keyboardContainer.dataset.lang == 'eventShiftRu') return this.keyboardContainer.dataset.lang = 'ru';
    if (this.keyboardContainer.dataset.lang == 'en') return this.keyboardContainer.dataset.lang = 'eventShiftEn';
    if (this.keyboardContainer.dataset.lang == 'eventShiftEn') return this.keyboardContainer.dataset.lang = 'en';
  }

  tab() {
    const end = this.textarea.selectionEnd;
    const start = this.textarea.selectionStart;
    const value = this.textarea.value;
    if (value.length === start) {
      this.textarea.value = `${value}\t`;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    } else if (start === end) {
      const arr = value.split('');
      arr.splice(start, 0, '\t');
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    } else {
      const arr = value.split('');
      const amount = end - start;
      arr.splice(start, amount);
      arr.splice(start, 0, '\t');
      const str = arr.join('');
      this.textarea.value = str;
      this.textarea.selectionStart = start + 1;
      this.textarea.selectionEnd = start + 1;
    }
  }

  chekLang() {
    return this.keyboardContainer.dataset.lang;
  }

  capsLock() {
    this.isCaps = !this.isCaps;
    if (this.keyboardContainer.dataset.lang == 'en') return this.keyboardContainer.dataset.lang = 'capsLockEn';
    if (this.keyboardContainer.dataset.lang == 'ru') return this.keyboardContainer.dataset.lang = 'capsLockRu';
    if (this.keyboardContainer.dataset.lang == 'capsLockRu') return this.keyboardContainer.dataset.lang = 'ru';
    if (this.keyboardContainer.dataset.lang == 'capsLockEn') return this.keyboardContainer.dataset.lang = 'en';
  }
}
