'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var uploadInput = document.querySelector('#upload-file');
  var userImage = document.querySelector('.img-upload__preview').querySelector('img');

  var changeImageSrc = function (data) {
    userImage.src = data;
  };

  var uploadImage = function (input, func) {
    var file = input.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          func(reader.result);
        });
        reader.readAsDataURL(file);
      }
    }
  };

  var removeListners = function () {
    document.removeEventListener('click', onClickMessageRemove);
    document.removeEventListener('keydown', onEscMessageRemove);
  };

  var onClickMessageRemove = function () {
    if (main.querySelector('.success')) {
      main.removeChild(successMessage);
    } else if (main.querySelector('.error')) {
      main.removeChild(errorMessage);
    }
    removeListners();
  };

  var onEscMessageRemove = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      if (main.querySelector('.success')) {
        main.removeChild(successMessage);
      } else if (main.querySelector('.error')) {
        main.removeChild(errorMessage);
      }
      removeListners();
    }
  };

  var showMessage = function (message) {
    main.appendChild(message);
    document.addEventListener('click', onClickMessageRemove);
    document.addEventListener('keydown', onEscMessageRemove);
  };

  var onSuccessSubmit = function () {
    window.form.resetUploadForm();
    window.form.hideUploadForm();
    showMessage(successMessage);
  };

  var onErrorSubmit = function () {
    window.form.resetUploadForm();
    window.form.hideUploadForm();
    showMessage(errorMessage);
  };

  var resetZoom = function () {
    userImage.style.transform = 'scale(1)';
    window.effects.scale.value = '100%';
  };

  var resetImageEffects = function () {
    userImage.style.filter = '';
    userImage.className = 'effects__preview--none';
    window.utils.hideElement(window.effects.effectLevelBar);
  };

  uploadInput.addEventListener('change', function () {
    uploadImage(uploadInput, changeImageSrc);
    resetImageEffects();
    resetZoom();
  });

  window.form.uploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.uploadForm), onSuccessSubmit, onErrorSubmit);
    evt.preventDefault();
  });

  window.upload = {
    userImage: userImage,
    resetImageEffects: resetImageEffects
  };

})();
