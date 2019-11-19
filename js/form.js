'use strict';
(function () {
  var TAG_NUMBER = 5;
  var DEBOUNCE_INTERVAL = 500;
  var MAX_TAG_LENGTH = 20;
  var uploadFileInput = document.querySelector('#upload-file');
  var uploader = document.querySelector('.img-upload__overlay');
  var uploaderCloseButton = uploader.querySelector('.img-upload__cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtags = document.querySelector('.text__hashtags');
  var description = document.querySelector('.text__description');

  var checkDuplicates = function (array) {
    var result = [];
    array.forEach(function (it) {
      if (!result.includes(it.toLowerCase())) {
        result.push(it);
      }
    });
    return result.length < array.length;
  };

  var onClickCheckHashtags = window.debounce(DEBOUNCE_INTERVAL, function () {
    var re = new RegExp('(^#[a-z\d][\w-]*)');
    var tagList = hashtags.value.split(' ').filter(function (el) {
      return el.length > 0;
    });
    hashtags.setCustomValidity('');
    if (tagList.length > TAG_NUMBER) {
      hashtags.setCustomValidity('Воу воу, полегче, не боле 5ти тегов на фото');
    }
    if (checkDuplicates(tagList)) {
      hashtags.setCustomValidity('Воу воу, полегче, не нужно одинаковых хештегов!');
    }
    tagList.forEach(function (it) {
      if (!re.test(it)) {
        hashtags.setCustomValidity('Воу воу, полегче! Пиши хештег правильно! Начни с решетки, затем символы, буквы или цифры, не более 20ти!');
      } else if (it.length > MAX_TAG_LENGTH) {
        hashtags.setCustomValidity('Воу воу, полегче! Хештег не должен быть длинне 20 символов');
      }
    });
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

  hashtags.addEventListener('input', onClickCheckHashtags);

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
