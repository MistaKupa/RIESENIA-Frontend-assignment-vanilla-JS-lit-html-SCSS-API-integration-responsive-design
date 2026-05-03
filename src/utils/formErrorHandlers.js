import { validateEmailFormat, validateNameSurename, validatePhoneFormat } from "./formValidation";

export const showError = (input, message) => {
    const messageSpan = input.nextElementSibling.querySelector(".js-error-message");
    messageSpan.textContent = message;

    input.classList.add("is-error");
    input.nextElementSibling.classList.add("is-visible");

    const errorSpan = input.nextElementSibling;
    errorSpan.setAttribute("role", "alert");
    errorSpan.classList.add("is-visible");
};

export const hideError = (input) => {
    if (!input.nextElementSibling) return;
    input.classList.remove("is-error");
    input.removeAttribute("aria-invalid");
    input.nextElementSibling.classList.remove("is-visible");
};

export const handleEmailBlur = (e) => {
    const email = e.target.value;
    const error = validateEmailFormat(email);

    if (error) {
        showError(e.target, error);
        return;
    }

    hideError(e.target);
};

export const handleNameBlur = (e) => {
    const name = e.target.value;
    const error = validateNameSurename(name);

    if (error) {
        showError(e.target, error);
        return;
    }

    hideError(e.target);
};

export const handlePhoneBlur = (e) => {
    const phone = e.target.value;
    const error = validatePhoneFormat(phone);

    if (error) {
        showError(e.target, error);
        return;
    }

    hideError(e.target);
};
