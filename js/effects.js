'use strict';
(function () {
  var ZOOM_STEP = 25;
  var MIN_ZOOM = 25;
  var MAX_ZOOM = 100;
  var BLUR_RATIO = 33.3;
  var HEAT_RATIO = 50;
  var effect = document.querySelector('.img-upload__effects');
  var radio = document.querySelectorAll('input[type="radio"');
  var smaller = document.querySelector('.scale__control--smaller');
  var bigger = document.querySelector('.scale__control--bigger');
  var scale = document.querySelector('.scale__control--value');
  var effectLevelBar = document.querySelector('.img-upload__effect-level');

  var removeListners = function () {
    window.move.pin.removeEventListener('mousedown', addChromeAdjust);
    window.move.pin.removeEventListener('mousedown', addSepiaAdjust);
    window.move.pin.removeEventListener('mousedown', addInvertAdjust);
    window.move.pin.removeEventListener('mousedown', addPhobosAdjust);
    window.move.pin.removeEventListener('mousedown', addBrightnessAdjust);
  };

  var adjustChrome = function () {
    window.upload.userImage.style.filter = 'grayscale(' + window.move.effectLevelInput.value / 100 + ')';
  };

  var removeChromeAdjust = function () {
    document.removeEventListener('mousemove', adjustChrome);
    document.removeEventListener('mouseup', removeChromeAdjust);
  };

  var addChromeAdjust = function () {
    document.addEventListener('mousemove', adjustChrome);
    document.addEventListener('mouseup', removeChromeAdjust);
  };

  var adjustSepia = function () {
    window.upload.userImage.style.filter = 'sepia(' + window.move.effectLevelInput.value / 100 + ')';
  };

  var removeSepiaAdjust = function () {
    document.removeEventListener('mousemove', adjustSepia);
    document.removeEventListener('mouseup', removeSepiaAdjust);
  };

  var addSepiaAdjust = function () {
    document.addEventListener('mousemove', adjustSepia);
    document.addEventListener('mouseup', removeSepiaAdjust);
  };

  var adjustInvert = function () {
    window.upload.userImage.style.filter = 'invert(' + window.move.effectLevelInput.value + '%)';
  };

  var removeInvertAdjust = function () {
    document.removeEventListener('mousemove', adjustInvert);
    document.removeEventListener('mouseup', removeInvertAdjust);
  };

  var addInvertAdjust = function () {
    document.addEventListener('mousemove', adjustInvert);
    document.addEventListener('mouseup', removeInvertAdjust);
  };

  var adjustPhobos = function () {
    window.upload.userImage.style.filter = 'blur(' + window.utils.round(window.move.effectLevelInput.value / BLUR_RATIO, 1) + 'px)';
  };

  var removePhobosAdjust = function () {
    document.removeEventListener('mousemove', adjustPhobos);
    document.removeEventListener('mouseup', removePhobosAdjust);
  };

  var addPhobosAdjust = function () {
    document.addEventListener('mousemove', adjustPhobos);
    document.addEventListener('mouseup', removePhobosAdjust);
  };

  var adjustBrightness = function () {
    window.upload.userImage.style.filter = 'brightness(' + window.utils.round(window.move.effectLevelInput.value / HEAT_RATIO + 1, 1);
  };

  var removeBrightnessAdjust = function () {
    document.removeEventListener('mousemove', adjustBrightness);
    document.removeEventListener('mouseup', removeBrightnessAdjust);
  };

  var addBrightnessAdjust = function () {
    document.addEventListener('mousemove', adjustBrightness);
    document.addEventListener('mouseup', removeBrightnessAdjust);
  };


  var applyEffect = function () {
    removeListners();
    radio.forEach(function (it) {
      if (it.checked) {
        window.utils.showElement(effectLevelBar);
        window.upload.userImage.className = 'effects__preview--' + it.value;
        window.upload.userImage.style.filter = '';
        switch (it.value) {
          case 'chrome':
            window.move.pin.addEventListener('mousedown', addChromeAdjust);
            break;
          case 'sepia':
            window.move.pin.addEventListener('mousedown', addSepiaAdjust);
            break;
          case 'marvin':
            window.move.pin.addEventListener('mousedown', addInvertAdjust);
            break;
          case 'phobos':
            window.move.pin.addEventListener('mousedown', addPhobosAdjust);
            break;
          case 'heat':
            window.move.pin.addEventListener('mousedown', addBrightnessAdjust);
            break;
          default:
            window.upload.resetImageEffects();
        }
      }
    });
  };

  effect.addEventListener('change', applyEffect);

  smaller.addEventListener('click', function () {
    var scaleDefault = parseInt(scale.value, 10);
    if (scaleDefault > MIN_ZOOM) {
      scale.value = scaleDefault - ZOOM_STEP + '%';
      window.upload.userImage.style.transform = 'scale(' + (scaleDefault - ZOOM_STEP) / 100 + ')';
    }
  });

  bigger.addEventListener('click', function () {
    var scaleDefault = parseInt(scale.value, 10);
    if (scaleDefault < MAX_ZOOM) {
      scale.value = scaleDefault + ZOOM_STEP + '%';
      window.upload.userImage.style.transform = 'scale(' + (scaleDefault + ZOOM_STEP) / 100 + ')';
    }
  });

  window.effects = {
    scale: scale,
    effectLevelBar: effectLevelBar
  };

})();
