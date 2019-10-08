'use strict';
var arrayLength = 25;
var picture = document.querySelector('#picture').content.querySelector('.picture');
var picturesSection = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var commentItem = document.querySelector('.social__comment');

// получаю случайное число
var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// скрываю элемент
var hideElement = function (element) {
  element.classList.add('hidden');
};

var MOCK = {
  url: ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg', 'photos/10.jpg',
    'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg', 'photos/20.jpg', 'photos/21.jpg', 'photos/22.jpg',
    'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg'
  ],
  description: ['закат в Гималаях', 'Я с подругой', 'Тяжелое утро', 'Спешу на работу', 'Самый лучший день', 'Моя любимая', 'Настроение осеннее'],
  likes: {
    min: 15,
    max: 200
  },
  comments: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Моя рыбка позирует немного получше'
  ],
  avatar: ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'],
  name: ['Феликс', 'Сегизмунд', 'Герман', 'Анжелика', 'Дея Торис', 'Фиона', 'Йеннифер', 'Трисс', 'Геральт', 'Фродо']
};

// генерирую массив данных на основании моковых данных
var generatePictureArray = function (mock) {
  var arr = [];
  for (var i = 0; i < arrayLength; i++) {
    arr[i] = {
      url: mock.url[i],
      description: mock.description[randomNumber(0, mock.description.length - 1)],
      likes: randomNumber(mock.likes.min, mock.likes.max),
      comments: mock.comments,
      avatar: mock.avatar[randomNumber(0, mock.avatar.length - 1)],
      name: mock.name[randomNumber(0, mock.name.length - 1)]
    };
  }
  return arr;
};

// генерирую превью на страницу
var generatePicturePreview = function (data) {
  var element = picture.cloneNode(true);
  element.querySelector('.picture__img').src = data.url;
  element.querySelector('.picture__likes').textContent = data.likes;
  element.querySelector('.picture__comments').textContent = data.comments;
  return element;
};

// размещаю превью на странице
var renderPreviews = function (data) {
  data.forEach(function (it) {
    picturesSection.appendChild(generatePicturePreview(it));
  });
};

// заполняю данными карточку превью
var renderBigPicture = function (element, array) {
  element.querySelector('.big-picture__img').querySelector('img').src = array.url;
  element.querySelector('.likes-count').textContent = array.likes;
  element.querySelector('.comments-count').textContent = array.comments.length;
  element.querySelectorAll('.social__comment').forEach(function (it) {
    it.remove();
  });
  for (var i = 0; i < array.comments.length; i++) {
    element.querySelector('.social__comments').appendChild(generateComments(pictures[i]));
  }
  element.querySelector('.social__caption').textContent = array.description;
  element.classList.remove('hidden');
};

// генерирую блок комментариев к карточке
var generateComments = function (array) {
  var element = commentItem.cloneNode(true);
  element.querySelector('.social__picture').src = array.avatar;
  element.querySelector('.social__text').textContent = array.comments[randomNumber(0, array.comments.length - 1)];
  return (element);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ход выполнения <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var pictures = generatePictureArray(MOCK);

renderPreviews(pictures);

renderBigPicture(bigPicture, pictures[6]);

hideElement(document.querySelector('.social__comment-count'));

hideElement(document.querySelector('.comments-loader'));
