'use strict';
(function () {
  var ESC_KEYCODE = 27;
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
    hideElement: hideElement,
    showElement: showElement,
    ESC_KEYCODE: ESC_KEYCODE,
    round: round
  };

})();
