let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileMission = profile.querySelector('.profile__mission');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__name');
let missionInput = popupForm.querySelector('.popup__mission');

let elements = document.querySelector('.elements');
let reactionButton = elements.querySelector('.element__reaction-button');

function editOpened() {
    popup.classList.add('popup_opened');
};

function editClosed() {
    popup.classList.remove('popup_opened');
};

function formSubmit(event) {
    event.preventDefault();
    nameInput.value;
    profileName.textContent = nameInput.value;
    missionInput.value;
    profileMission.textContent = missionInput.value;
    editClosed();
};

function reaction() {
    reactionButton.classList.toggle('element__reaction-button_active');
};

let saveButton = popup.querySelector('.popup__save-button');

editButton.addEventListener('click', editOpened);
closeButton.addEventListener('click', editClosed);
popupForm.addEventListener('submit', formSubmit);
reactionButton.addEventListener('click', reaction);
