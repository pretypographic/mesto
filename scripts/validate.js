const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButton: '.popup__save-button',
    submitButtonDisabled: 'popup__save-button_disabled',
    addInputInvalid: (formInput) => {formInput.classList.add('popup__input_invalid')},
    removeInputInvalid: (formInput) => {formInput.classList.remove('popup__input_invalid')}
  };

const showInputError = (form, formInput, settings) => {
    const warning = form.querySelector(`.${formInput.id}-warning`);
    warning.textContent = formInput.validationMessage;
    warning.style.opacity = 1;
    settings.addInputInvalid(formInput);
}

const hideInputError = (form, formInput, settings) => {
    const warning = form.querySelector(`.${formInput.id}-warning`);
    warning.textContent = '';
    warning.style.opacity = 0;
    settings.removeInputInvalid(formInput);
}

const isValid = (form, formInput, settings) => {
    if (!formInput.validity.valid) {
        showInputError(form, formInput, settings);
    } else {
        hideInputError(form, formInput, settings);
    }
}

const setEventListeners = (form, settings) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButton);
    toggleButtonState(inputList, submitButton, settings);
    inputList.forEach((formInput) => {        
        formInput.addEventListener('input', function() {
            isValid(form, formInput, settings);
            toggleButtonState(inputList, submitButton, settings);
        });
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, submitButton, settings) => {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add(settings.submitButtonDisabled);
        submitButton.setAttribute('disabled', true);
    } else {
        submitButton.classList.remove(settings.submitButtonDisabled);
        submitButton.removeAttribute('disabled');
    }
}

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((form) => {
        setEventListeners(form, settings);
    });
}

enableValidation(settings);