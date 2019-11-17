'use strict';
(function () {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploader = document.querySelector('.img-upload__overlay');
  var uploaderCloseButton = uploader.querySelector('.img-upload__cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtags = document.querySelector('.text__hashtags');
  var description = document.querySelector('.text__description');

  description.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscUploaderHide);
  });

  description.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscUploaderHide);
  });

  hashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscUploaderHide);
  });

  hashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscUploaderHide);
  });

  var resetUploadForm = function () {
    uploadForm.reset();
    window.move.resetPinPosition();
  };

  var hideUploadForm = function () {
    window.utils.hideElement(uploader);
    uploaderCloseButton.removeEventListener('click', onClickUploaderHide);
    document.removeEventListener('keydown', onEscUploaderHide);
  };

  var onClickUploaderHide = function () {
    resetUploadForm();
    hideUploadForm();
  };

  var onEscUploaderHide = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      resetUploadForm();
      hideUploadForm();
    }
  };

  uploadFileInput.addEventListener('change', function () {
    window.utils.showElement(uploader);
    uploaderCloseButton.addEventListener('click', onClickUploaderHide);
    document.addEventListener('keydown', onEscUploaderHide);
  });

  window.form = {
    resetUploadForm: resetUploadForm,
    hideUploadForm: hideUploadForm,
    uploadForm: uploadForm
  };

})();
