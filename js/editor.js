'use strict';
(function () {
  var PIN_PERCENT = 4.5;
  var EFFECT_DEFAULT = 20;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var effectLevelInput = document.querySelector('.effect-level__value');

  var getCoords = function (elem) {
    return elem.getBoundingClientRect().left;
  };

  var getEffectLevelValue = function () {
    return Math.round((getCoords(effectLevelPin) - getCoords(effectLevelLine)) / PIN_PERCENT) + 2;
  };

  window.utils.hideElement(document.querySelector('.social__comment-count'));

  effectLevelPin.addEventListener('mouseup', function () {
    effectLevelInput.value = getEffectLevelValue();
  });

  effectsRadio.forEach(function (it) {
    it.addEventListener('change', function () {
      effectLevelInput.value = EFFECT_DEFAULT;
      window.move.resetPinPosition();
    });
  });
})();
