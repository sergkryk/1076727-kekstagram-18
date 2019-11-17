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

  var applyEffect = function () {
    radio.forEach(function (it) {
      if (it.checked) {
        window.utils.showElement(effectLevelBar);
        window.upload.userImage.className = 'effects__preview--' + it.value;
        window.upload.userImage.style.filter = '';
        switch (it.value) {
          case 'chrome':
            window.move.pin.addEventListener('mouseup', function () {
              window.upload.userImage.style.filter = 'grayscale(' + window.move.effectLevelInput.value / 100 + ')';
            });
            break;
          case 'sepia':
            window.move.pin.addEventListener('mouseup', function () {
              window.upload.userImage.style.filter = 'sepia(' + window.move.effectLevelInput.value / 100 + ')';
            });
            break;
          case 'marvin':
            window.move.pin.addEventListener('mouseup', function () {
              window.upload.userImage.style.filter = 'invert(' + window.move.effectLevelInput.value + '%)';
            });
            break;
          case 'phobos':
            window.move.pin.addEventListener('mouseup', function () {
              window.upload.userImage.style.filter = 'blur(' + window.utils.round(window.move.effectLevelInput.value / BLUR_RATIO, 1) + 'px)';
            });
            break;
          case 'heat':
            window.move.pin.addEventListener('mouseup', function () {
              window.upload.userImage.style.filter = 'brightness(' + window.utils.round(window.move.effectLevelInput.value / HEAT_RATIO + 1, 1);
            });
            break;
          default:
            window.upload.resetImageEffects();
            // scale.value = '100git%';
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
