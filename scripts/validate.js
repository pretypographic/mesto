const showInputError = (form, formInput) => {
    const warning = form.querySelector(`.${formInput.id}-warning`);
    warning.textContent = formInput.validationMessage;
    warning.style.opacity = 1;
}

const hideInputError = (form, formInput) => {
    const warning = form.querySelector(`.${formInput.id}-warning`);
    warning.textContent = '';
    warning.style.opacity = 0;
    formInput.classList.remove('popup__input_invalid');
}

const isValid = (form, formInput) => {
    if (!formInput.validity.valid) {
        showInputError(form, formInput);
    } else {
        hideInputError(form, formInput);
    }
}

const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const submitButton = form.querySelector('.popup__save-button');
    toggleButtonState(inputList, submitButton);
    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function() {
            isValid(form, formInput);
            toggleButtonState(inputList, submitButton);
        });
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, submitButton) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add('popup__save-button_disabled');
    } else {
        submitButton.classList.remove('popup__save-button_disabled');
    }
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((form) => {
        setEventListeners(form);
    });
}

enableValidation();