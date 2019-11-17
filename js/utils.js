'use strict';
(function () {
  var ESC_KEYCODE = 27;
  // получить случайное число
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  // скрыть элемент
  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  // показать элемент
  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var round = function (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    hideElement: hideElement,
    showElement: showElement,
    ESC_KEYCODE: ESC_KEYCODE,
    round: round
  };
})();
