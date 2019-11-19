'use strict';
(function () {
  var commentsLoader = document.querySelector('.comments-loader');
  var comment = document.querySelector('.social__comment');

  var removeComments = function (element) {
    element.querySelectorAll('.social__comment').forEach(function (it) {
      it.remove();
    });
  };

  var addComments = function (array, element, counter) {
    array.comments.slice(0, counter).forEach(function (it) {
      element.querySelector('.social__comments').appendChild(generateComments(it));
    });
  };

  var generateComments = function (array) {
    var element = comment.cloneNode(true);
    element.querySelector('.social__picture').src = array.avatar;
    element.querySelector('.social__picture').alt = array.name;
    element.querySelector('.social__text').textContent = array.message;
    return (element);
  };

  var renderComments = function (array, element, counter) {
    window.utils.showElement(document.querySelector('.comments-loader'));
    removeComments(element);
    addComments(array, element, counter);
    if (array.comments.length <= counter) {
      window.utils.hideElement(document.querySelector('.comments-loader'));
    }
  };

  window.comments = {
    commentsLoader: commentsLoader,
    renderComments: renderComments
  };

})();
