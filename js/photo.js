'use strict';
(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photosContainer = document.querySelector('.pictures');
  var photoSection = document.querySelector('.big-picture');
  var photoSectionCloseBtn = photoSection.querySelector('.big-picture__cancel');
  var filter = document.querySelector('.img-filters');
  var fragment = document.createDocumentFragment();

  var showFilters = function () {
    filter.classList.remove('img-filters--inactive');
  };

  var createPhotoPreview = function (data) {
    var element = photoTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = data.url;
    element.querySelector('.picture__likes').textContent = data.likes;
    element.querySelector('.picture__comments').textContent = data.comments.length;
    element.tabindex = 0;
    element.addEventListener('click', function () {
      createPhoto(photoSection, data);
      element.blur();
    });
    return element;
  };

  var renderPhotoPreviews = function (data) {
    data.forEach(function (it) {
      fragment.appendChild(createPhotoPreview(it));
    });
    photosContainer.appendChild(fragment);
  };

  var removePhotoPreviews = function () {
    document.querySelectorAll('.picture').forEach(function (it) {
      it.remove();
    });
  };

  var createPhoto = function (element, array) {
    var counter = 5;
    element.querySelector('.big-picture__img').querySelector('img').src = array.url;
    element.querySelector('.likes-count').textContent = array.likes;
    element.querySelector('.comments-count').textContent = array.comments;
    window.comments.renderComments(array, element, counter);
    element.querySelector('.social__caption').textContent = array.description;
    window.comments.commentsLoader.addEventListener('click', function () {
      window.comments.renderComments(array, element, (counter += 5));
    });
    photoSectionCloseBtn.addEventListener('click', onClickPhotoHide);
    document.addEventListener('keydown', onEscPhotoHide);
    window.utils.showElement(element);
  };

  var onEscPhotoHide = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.utils.hideElement(photoSection);
      document.removeEventListener('keydown', onEscPhotoHide);
      photoSectionCloseBtn.removeEventListener('click', onClickPhotoHide);
    }
  };

  var onClickPhotoHide = function () {
    window.utils.hideElement(photoSection);
    document.removeEventListener('keydown', onEscPhotoHide);
    photoSectionCloseBtn.removeEventListener('click', onClickPhotoHide);
  };

  var initializeData = function (data) {
    window.data = data;
    renderPhotoPreviews(window.data);
    showFilters();
  };

  var createErrorEl = function (data) {
    var error = document.querySelector('#error').content.querySelector('.error');
    error.querySelectorAll('.error__button').forEach(function (it, index) {
      if (index === 1) {
        it.remove();
      }
    });
    error.querySelector('.error__title').textContent = data;
    error.querySelector('.error__button').addEventListener('click', function () {
      error.remove();
    });
    return error;
  };

  var processLoadError = function (data) {
    document.querySelector('main').appendChild(createErrorEl(data));
  };

  var processServerData = function () {
    window.backend.load(initializeData, processLoadError);
  };

  processServerData();

  window.photo = {
    removePhotoPreviews: removePhotoPreviews,
    renderPhotoPreviews: renderPhotoPreviews
  };

})();
