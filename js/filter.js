'use strict';
(function () {
  var FILTERED_COUNT = 10;
  var INTERVAL = 500;
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var filtersForm = document.querySelector('.img-filters__form');

  var toggleActive = function (element) {
    filterButtons.forEach(function (it) {
      if (it.classList.contains('img-filters__button--active')) {
        it.classList.remove('img-filters__button--active');
      }
    });
    document.querySelector('#' + element).classList.add('img-filters__button--active');
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

  var onClickSort = window.debounce(INTERVAL, function (evt) {
    window.photo.removePhotoPreviews();
    toggleActive(evt.target.id);
    switch (evt.target.id) {
      case 'filter-popular':
        window.photo.renderPhotoPreviews(window.data);
        break;
      case 'filter-discussed':
        window.photo.renderPhotoPreviews(window.data.slice().sort(function (b, a) {
          return a.comments.length - b.comments.length;
        }));
        break;
      case 'filter-random':
        window.photo.renderPhotoPreviews(shuffle(window.data.slice()).slice(0, FILTERED_COUNT));
        break;
    }
  });

  filtersForm.addEventListener('click', onClickSort);

})();
