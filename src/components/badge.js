import { html } from "lit-html";

export const renderBadge = (badge) => {
    const { type, label } = badge;

    const typeClass =
        type === "discount"
            ? "c-solution-product-badge--discount"
            : "c-solution-product-badge--new";

    return html`<span class="c-solution-product-badge ${typeClass}">${label}</span>`;
};
