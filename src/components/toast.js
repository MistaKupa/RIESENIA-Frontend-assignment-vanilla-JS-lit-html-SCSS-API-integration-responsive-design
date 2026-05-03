import { html, nothing, render } from "lit-html";

const successIcon = html`<span class="c-solution-toast__content__icon--success"
    ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
    >
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
    </svg>
</span>`;

const warningIcon = html`<span class="c-solution-toast__content__icon--warning">
    <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-exclamation-triangle-fill"
        viewBox="0 0 16 16"
    >
        <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
        />
    </svg>
</span>`;

const errorIcon = html`<span class="c-solution-toast__content__icon--error"
    ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-x-circle-fill"
        viewBox="0 0 16 16"
    >
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
        />
    </svg>
</span>`;

const renderToast = (type, message) => {
    return html`<div class="c-solution-toast">
        <div class="c-solution-toast__content">
            ${type === "success" ? successIcon : nothing}
            ${type === "warning" ? warningIcon : nothing} ${type === "error" ? errorIcon : nothing}

            <span class="c-solution-toast__content__message">${message}</span>
        </div>
    </div>`;
};

let toastTimeout = null;

export const showToast = (type, message) => {
    const previousToastEl = document.querySelector(".js-toast");

    if (previousToastEl) previousToastEl.remove();
    if (toastTimeout) clearTimeout(toastTimeout);

    const toastEl = document.createElement("div");
    toastEl.classList.add("js-toast");
    toastEl.setAttribute("aria-live", "polite");
    toastEl.setAttribute("aria-atomic", "true");
    document.body.appendChild(toastEl);
    render(renderToast(type, message), toastEl);

    toastTimeout = setTimeout(() => toastEl.remove(), 6000);
};

//  <button class="c-solution-toast__close">
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 class="bi bi-x-lg"
//                 viewBox="0 0 16 16"
//             >
//                 <path
//                     d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
//                     stroke="currentColor"
//                     stroke-width="0.2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                 />
//             </svg>
//         </button>
