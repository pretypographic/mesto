let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileMission = profile.querySelector('.profile__mission');
let addButton = profile.querySelector('.profile__add-button');

let popup = document.querySelector('.popup');
let profileSettings = document.querySelector('#profileSettings');
let profileForm = profileSettings.querySelector('#profileForm');
let saveButton = profileSettings.querySelector('.popup__save-button');
let newLocation = document.querySelector('#newLocation');
let locationForm = newLocation.querySelector('#locationForm');

let elements = document.querySelector('.elements');
let elementTemplate = elements.querySelector('#elementTemplate').content;
let imageTemplate = document.querySelector('#imageTemplate').content;

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addElement = function(item) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__title').textContent = item.name;  
  element.querySelector('.element__img').setAttribute('src', item.link);

  const reactionButton = element.querySelector('.element__reaction-button');
  function reaction() {
    reactionButton.classList.toggle('element__reaction-button_active');
  };
  reactionButton.addEventListener('click', reaction);

  const trashButton = element.querySelector('.element__trash-button');
  function deleteElement() {
    trashButton.parentElement.remove();
  };
  trashButton.addEventListener('click', deleteElement);

  const beholdImage = element.querySelector('.element__img');
  function openImage() {
    const behold = imageTemplate.cloneNode(true);
    behold.querySelector('.behold__image').setAttribute('src', beholdImage.getAttribute('src'));    
    behold.querySelector('.behold__name').textContent = beholdImage.nextElementSibling.children[0].textContent;

    const beholdCloseButton = behold.querySelector('.behold__close-button');
    function stopBeholding() {
      beholdCloseButton.parentElement.parentElement.remove();
    };
    beholdCloseButton.addEventListener('click', stopBeholding);

    document.body.prepend(behold);
  };
  beholdImage.addEventListener('click', openImage);

  elements.prepend(element);
};

initialCards.forEach(addElement);

function popupOpened(form) {
    form.classList.remove('popup_condition_closed');
    form.classList.add('popup_condition_opened');
};

function popupClosed(form) {
    form.classList.remove('popup_condition_opened');
    form.classList.add('popup_condition_closed');
};

function profileFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = profileForm.querySelector('.popup__name').value;
    profileMission.textContent = profileForm.querySelector('.popup__mission').value;

    popupClosed(profileSettings);
};

function locationFormSubmit(event) {
  event.preventDefault();

  const location = {
    name: locationForm.querySelector('.popup__name').value,
    link: locationForm.querySelector('.popup__mission').value
  };

  addElement(location);
  popupClosed(newLocation);
};

editButton.addEventListener('click', () => popupOpened(profileSettings));
profileSettings.querySelector('.popup__close-button').addEventListener('click', () => popupClosed(profileSettings));
profileForm.addEventListener('submit', profileFormSubmit);

addButton.addEventListener('click', () => popupOpened(newLocation));
newLocation.querySelector('.popup__close-button').addEventListener('click', () => popupClosed(newLocation));
locationForm.addEventListener('submit', locationFormSubmit);
