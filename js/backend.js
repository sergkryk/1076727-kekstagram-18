'use strict';
(function () {
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

  var processRequest = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    processRequest(xhr, onSuccess, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    processRequest(xhr, onSuccess, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
