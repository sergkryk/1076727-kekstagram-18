'use strict';
(function () {
  var PIN_START = 0;
  var PIN_END = 453;
  var pin = document.querySelector('.effect-level__pin');
  var pinTail = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var setPinCoord = function (shift) {
    switch (true) {
      case (pin.offsetLeft - shift) <= PIN_START:
        pin.style.left = PIN_START + 'px';
        break;
      case (pin.offsetLeft - shift) >= PIN_END:
        pin.style.left = PIN_END + 'px';
        break;
      default:
        pin.style.left = (pin.offsetLeft - shift) + 'px';
    }
  };

  var calculateEffectLevel = function (data) {
    return Math.round((data / PIN_END) * 100);
  };

  var Coordinate = function (x) {
    this.x = x;
  };

  Coordinate.prototype.setX = function (x) {
    this.x = x;
  };

  var resetPinPosition = function () {
    pin.style.left = '';
    pinTail.style.width = '';
  };

  pin.addEventListener('mousedown', function (evt) {
    var startCoord = new Coordinate(evt.clientX);

    var onMouseMove = function (moveEvt) {
      var shift = new Coordinate((startCoord.x - moveEvt.clientX));
      startCoord.setX(moveEvt.clientX);
      pin.style.left = setPinCoord(shift.x);
      pinTail.style.width = pin.style.left;
      effectLevelInput.value = calculateEffectLevel(pin.offsetLeft);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    resetPinPosition: resetPinPosition,
    effectLevelInput: effectLevelInput,
    pin: pin
  };
})();
