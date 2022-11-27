const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileMission = profile.querySelector('.profile__mission');

const profileSettings = document.querySelector('#profileSettings');
const profileForm = profileSettings.querySelector('#profileForm');
const profileFormName = profileForm.querySelector('.popup__name');
const profileFormMission = profileForm.querySelector('.popup__mission');

const newLocation = document.querySelector('#newLocation');
const locationForm = newLocation.querySelector('#locationForm');
const locationFormName = newLocation.querySelector('.popup__name');
const locationFormMission = newLocation.querySelector('.popup__mission');

const elements = document.querySelector('.elements');

function openPopup(form) {
  form.classList.remove('popup_condition_closed');
  form.classList.add('popup_condition_opened');
};

function closePopup(form) {
  form.classList.remove('popup_condition_opened');
  form.classList.add('popup_condition_closed');

  profileFormName.value = profileName.textContent;
  profileFormMission.value = profileMission.textContent;
};

function profileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileFormName.value;
  profileMission.textContent = profileFormMission.value;

  closePopup(profileSettings);
};

function locationFormSubmit(event) {
  event.preventDefault();

  const location = {
    name: locationFormName.value,
    link: locationFormMission.value
  };

  renderGalery(location);
  closePopup(newLocation);
  locationForm.reset();
};

const editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => openPopup(profileSettings));
profileSettings.querySelector('.popup__close-button').addEventListener('click', () => closePopup(profileSettings));
profileForm.addEventListener('submit', profileFormSubmit);

const addButton = profile.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openPopup(newLocation));
newLocation.querySelector('.popup__close-button').addEventListener('click', () => closePopup(newLocation));
locationForm.addEventListener('submit', locationFormSubmit);

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
  const elementTemplate = elements.querySelector('#elementTemplate').content;
  const element = elementTemplate.cloneNode(true);
  const reactionButton = element.querySelector('.element__reaction-button');
  const trashButton = element.querySelector('.element__trash-button');
  const beholdImage = element.querySelector('.element__img');

  element.querySelector('.element__title').textContent = item.name;  
  element.querySelector('.element__img').setAttribute('src', item.link);

  function reaction() {
    reactionButton.classList.toggle('element__reaction-button_active');
  };
  reactionButton.addEventListener('click', reaction);

  function deleteElement() {
    trashButton.closest('.element').remove();
  };
  trashButton.addEventListener('click', deleteElement);

  function openImage() {
    const beholdGallery = document.querySelector('#beholdGallery');

    beholdGallery.querySelector('.behold__image').setAttribute('src', beholdImage.getAttribute('src'));    
    beholdGallery.querySelector('.behold__name').textContent = beholdImage.nextElementSibling.children[0].textContent;

    const beholdCloseButton = beholdGallery.querySelector('.behold__close-button');
    function stopBeholding() {
      closePopup(beholdGallery);
    };
    beholdCloseButton.addEventListener('click', stopBeholding);
    
    openPopup(beholdGallery);
  };

  beholdImage.addEventListener('click', openImage);

  return element;
};

const renderGalery = function(item) {
  elements.prepend(addElement(item));
}

initialCards.forEach(renderGalery);
