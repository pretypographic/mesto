const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileMission = profile.querySelector('.profile__mission');

const profileSettings = document.querySelector('#profileSettings');
const profileForm = profileSettings.querySelector('#profileForm');
const profileFormName = profileForm.querySelector('#profileName');
const profileFormMission = profileForm.querySelector('#profileMission');

const newLocation = document.querySelector('#newLocation');
const locationForm = newLocation.querySelector('#locationForm');
const locationFormName = newLocation.querySelector('#locationName');
const locationFormMission = newLocation.querySelector('#locationLink');

const elements = document.querySelector('.elements');
const beholdGallery = document.querySelector('#beholdGallery');
const beholdImg = beholdGallery.querySelector('.behold__image');
const beholdDescription = beholdGallery.querySelector('.behold__name');

function openPopup(form) {
  form.classList.remove('popup_condition_closed');
  form.classList.add('popup_condition_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(form) {
  form.classList.remove('popup_condition_opened');
  form.classList.add('popup_condition_closed');
  document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedForm = document.querySelector('.popup_condition_opened');
    closePopup(openedForm);
  }
}

function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = profileFormName.value;
  profileMission.textContent = profileFormMission.value;

  closePopup(profileSettings);
};

function submitLocationForm(event) {
  event.preventDefault();

  const location = {
    name: locationFormName.value,
    link: locationFormMission.value
  };

  renderGalery(location);
  closePopup(newLocation);
  locationForm.reset();
  locationForm.lastElementChild.setAttribute('disabled', true);
  locationForm.lastElementChild.classList.add(settings.submitButtonDisabled);
};

const editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  profileFormName.value = profileName.textContent;
  profileFormMission.value = profileMission.textContent;
  openPopup(profileSettings)
});
profileForm.addEventListener('submit', submitProfileForm);

const addButton = profile.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openPopup(newLocation));
locationForm.addEventListener('submit', submitLocationForm);

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    const popupField = popup.querySelector('.popup-field');
    const withinPopupField = event.composedPath().includes(popupField);
    if (!withinPopupField) {
      closePopup(popup);
    }
    if (event.target.classList.contains('close-button')) {
      closePopup(popup)
    }
  })
})

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
  const elementImg = element.querySelector('.element__img');
  const reactionButton = element.querySelector('.element__reaction-button');
  const trashButton = element.querySelector('.element__trash-button');

  const description = item.name;
  const link = item.link;
  const alt = 'Изображение: ' + description + '.';
  element.querySelector('.element__title').textContent = description;  
  elementImg.setAttribute('src', link);
  elementImg.setAttribute('alt', alt);

  function reaction() {
    reactionButton.classList.toggle('element__reaction-button_active');
  };
  reactionButton.addEventListener('click', reaction);

  function deleteElement() {
    trashButton.closest('.element').remove();
  };
  trashButton.addEventListener('click', deleteElement);

  function openImage() {    
    beholdImg.setAttribute('src', link);
    beholdImg.setAttribute('alt', alt)
    beholdDescription.textContent = description;

    openPopup(beholdGallery);
  };

  elementImg.addEventListener('click', openImage);

  return element;
};

const renderGalery = function(item) {
  elements.prepend(addElement(item));
}

initialCards.forEach(renderGalery);
