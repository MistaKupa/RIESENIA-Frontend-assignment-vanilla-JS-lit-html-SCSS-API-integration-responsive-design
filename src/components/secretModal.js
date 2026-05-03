import { html } from "lit-html";
import { validateEmail } from "../api/emailApi";
import {
    handleEmailBlur,
    handleNameBlur,
    handlePhoneBlur,
    hideError,
    showError,
} from "../utils/formErrorHandlers";
import {
    validateEmailFormat,
    validateNameSurename,
    validatePhoneFormat,
} from "../utils/formValidation";
import { showToast } from "./toast";

document.addEventListener("keydown", (e) => {
    const modal = document.querySelector(".js-modal");
    const isOpen = modal.classList.contains("is-open");

    if (e.key === "Escape" && isOpen) {
        handleCloseModal();
    }
});

const handleCloseModal = (e) => {
    if (e && e.target !== e.currentTarget) return;

    const modal = document.querySelector(".js-modal");
    const form = document.querySelector(".js-modal-form");

    form.querySelectorAll("input").forEach((input) => hideError(input));

    modal.classList.toggle("is-open");
    document.querySelector(".js-cta-button").focus();
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const modalWindow = document.querySelector(".js-modal-window");

    const formData = new FormData(form);

    const email = formData.get("email");
    const nameSurename = formData.get("nameSurename");
    const phone = formData.get("phone");

    const emailInput = form.querySelector('input[name="email"]');
    const nameSurenameInput = form.querySelector('input[name="nameSurename"]');
    const phoneInput = form.querySelector('input[name="phone"]');

    const emailFormatError = validateEmailFormat(email);
    const nameSurnameError = validateNameSurename(nameSurename);
    const phoneFormatError = validatePhoneFormat(phone);

    if (emailFormatError) {
        showError(emailInput, emailFormatError);
    }

    if (nameSurnameError) {
        showError(nameSurenameInput, nameSurnameError);
    }

    if (phoneFormatError) {
        showError(phoneInput, phoneFormatError);
    }

    if (emailFormatError || nameSurnameError || phoneFormatError) {
        modalWindow.classList.add("is-error-animation");
        modalWindow.addEventListener(
            "animationend",
            () => {
                modalWindow.classList.remove("is-error-animation");
            },
            { once: true }
        );
        return;
    }

    const isEmailValid = await validateEmail(email);

    if (!isEmailValid.success) {
        showToast("error", isEmailValid.message);
        return;
    }

    showToast("success", isEmailValid.message);
    form.reset();
    handleCloseModal();
};

const errorSpanTemplate = () =>
    html`<span class="c-solution-modal__form__field__error">
        <span>
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                />
            </svg>
        </span>
        <span class="js-error-message"></span>
    </span>`;

export const renderSecretModal = () => {
    return html`<div class="c-solution-modal-overlay js-modal" @click=${handleCloseModal}>
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            class="c-solution-modal js-modal-window"
        >
            <button class="c-solution-modal__close" @click=${handleCloseModal}>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                        stroke="currentColor"
                        stroke-width="0.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>

            <div class="c-solution-modal__heading">
                <h2 id="modal-title" class="c-solution-modal__heading__title">
                    Tajná ponuka produktov Dewalt len pre vás
                </h2>
                <span class="c-solution-modal__heading__required">* povinné polia</span>
            </div>

            <form @submit=${handleSubmit} class="c-solution-modal__form js-modal-form">
                <div class="c-solution-modal__form__field">
                    <label for="email">E-mail <span>*</span></label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        @blur=${handleEmailBlur}
                        @input=${(e) => hideError(e.target)}
                    />
                    ${errorSpanTemplate()}
                </div>

                <div class="c-solution-modal__form__row">
                    <div class="c-solution-modal__form__field">
                        <label for="nameSurname">Meno a priezvisko <span>*</span></label>
                        <input
                            type="text"
                            name="nameSurname"
                            id="nameSurname"
                            @blur=${handleNameBlur}
                            @input=${(e) => hideError(e.target)}
                        />${errorSpanTemplate()}
                    </div>

                    <div class="c-solution-modal__form__field">
                        <label for="phone">Telefónne číslo (mobil) <span>*</span></label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+421 _ _ _  _ _ _  _ _ _"
                            @blur=${handlePhoneBlur}
                            @input=${(e) => hideError(e.target)}
                        />
                        ${errorSpanTemplate()}
                    </div>
                </div>

                <div class="c-solution-modal__form__field">
                    <label for="platform"
                        >Odkiaľ ste sa o tejto ponuke dozvedeli? <span>*</span></label
                    >
                    <select name="platform" id="platform">
                        <option value="Priamo z vášho webu">Priamo z vášho webu</option>
                        <option value="Od kamaráta">Od kamaráta</option>
                        <option value="Z Facebooku">Z Facebooku</option>
                        <option value="Z Instagramu">Z Instagramu</option>
                        <option value="Z Emailu">Z Emailu</option>
                    </select>
                </div>

                <div class="c-solution-modal__footer">
                    <button class="c-solution-modal__footer__button" type="submit">
                        <span class="sm-text">Získať tajnú ponuku</span>

                        <svg
                            aria-hidden="true"
                            class="sm-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <span class="c-solution-modal__footer__text"
                        >Odoslaním formuláru súhlasíte so
                        <a>spracovaním osobných údajov</a>
                    </span>
                </div>
            </form>
        </div>
    </div>`;
};
