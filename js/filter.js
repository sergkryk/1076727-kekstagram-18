'use strict';
(function () {
  var FILTERED_COUNT = 10;
  var popularButton = document.querySelector('#filter-popular');
  var randomButton = document.querySelector('#filter-random');
  var discussedButton = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var toggleActive = function (button) {
    filterButtons.forEach(function (it) {
      if (it.classList.contains('img-filters__button--active')) {
        it.classList.remove('img-filters__button--active');
      }
    });
    button.classList.add('img-filters__button--active');
  };

  var shuffle = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  var onClickByPopularitySort = window.debounce(function () {
    window.photo.removePhotoPreviews();
    toggleActive(popularButton);
    window.photo.renderPhotoPreviews(window.data);
  });

  var onClickByCommentsSort = window.debounce(function () {
    window.photo.removePhotoPreviews();
    toggleActive(discussedButton);
    window.photo.renderPhotoPreviews(window.data.slice().sort(function (b, a) {
      return a.comments.length - b.comments.length;
    }).slice(0, FILTERED_COUNT));
  });

  var onClickRandomlySort = window.debounce(function () {
    window.photo.removePhotoPreviews();
    toggleActive(randomButton);
    window.photo.renderPhotoPreviews(shuffle(window.data).slice(0, FILTERED_COUNT));
  });

  popularButton.addEventListener('click', onClickByPopularitySort);
  discussedButton.addEventListener('click', onClickByCommentsSort);
  randomButton.addEventListener('click', onClickRandomlySort);

})();
