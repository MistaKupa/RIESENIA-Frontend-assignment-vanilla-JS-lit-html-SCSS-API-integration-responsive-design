import { html } from "lit-html";
import dewaltPro from "../assets/images/products/dewalt_pro_700_max.png";
import metaboHeawy from "../assets/images/products/metabo_600_heawy_tools.png";
import { renderBadge } from "./badge";
import fallbackImage from "../assets/images/fallback.jpg";

const productImages = {
    "Dewalt Pro 700 Max": dewaltPro,
    "Metabo 600 Heavy tools": metaboHeawy,
};

const productActions = () => {
    return html`<div class="c-solution-products__card__actions">
        <button class="c-solution-products__card__actions__compare" aria-label="Porovnať produkt">
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-scale-icon lucide-scale"
            >
                <path d="M12 3v18" />
                <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
                <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
                <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
                <path d="M7 21h10" />
            </svg>
        </button>
        <button
            class="c-solution-products__card__actions__wishlist"
            aria-label="Pridať do wishlistu"
        >
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-heart-icon lucide-heart"
            >
                <path
                    d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
                />
            </svg>
        </button>
    </div>`;
};

const productRating = (rating, reviewCount) => {
    const stars = Math.round(rating);

    return html`<div
        class="c-solution-products-rating"
        aria-label="Hodnotenie je ${rating} z 5 (${reviewCount} recenzií)"
        role="img"
    >
        ${[1, 2, 3, 4, 5].map(
            (i) =>
                html` <span
                    class="c-solution-products-rating__star ${i <= stars ? "is-filled" : ""}"
                    aria-hidden="true"
                >
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                    </svg>
                </span>`
        )}
        <span class="c-solution-products-rating__count">(${reviewCount})</span>
    </div>`;
};

export const renderProductCard = (product, quantity, onDecrement, onIncrement, addToCart) => {
    const {
        id,
        name,
        rating,
        reviewCount,
        sku,
        originalPrice,
        salePrice,
        priceWithoutVAT,
        stock,
        badges,
        imageUrl: placeholderImage,
    } = product;

    const currentImage = productImages[name] || placeholderImage || fallbackImage;

    return html`<div class="c-solution-products__card" data-product-id="${id}">
        <div class="c-solution-products__card__badges">
            ${badges?.map((badge) => renderBadge(badge))}
        </div>

        ${productActions()}

        <div class="c-solution-products__image">
            <img src="${currentImage}" alt="Obrazok produktu ${name}" />
        </div>

        <div class="c-solution-products__info">
            <div class="c-solution-products__info__details">
                ${productRating(rating, reviewCount)}

                <h4 class="c-solution-products__info__details__title">${name}</h4>
                <span class="c-solution-products__info__details__serial">${sku}</span>
            </div>

            <div class="c-solution-products__info__price">
                <span class="c-solution-products__info__price__original"
                    >${originalPrice ? originalPrice : "-"} €</span
                >
                <span class="c-solution-products__info__price__discount"
                    >${salePrice ? salePrice.toFixed(2) : "-"} €</span
                >
                <span class="c-solution-products__info__price__dph">
                    ${priceWithoutVAT ? priceWithoutVAT.toFixed(2) : "-"} € bez DPH</span
                >
            </div>

            <span class="c-solution-products__info__storage">${stock}</span>
        </div>

        <div class="c-solution-products__buttons">
            <div class="c-solution-products__buttons__quantity">
                <button
                    class="c-solution-products__buttons__quantity__action js-decrement"
                    aria-label="Znížiť počet kusov"
                    @click=${onDecrement}
                >
                    &ndash;
                </button>
                <span
                    class="c-solution-products__buttons__quantity__amount js-quantity"
                    aria-label="Počet kusov ${quantity}"
                >
                    ${quantity}</span
                >

                <button
                    class="c-solution-products__buttons__quantity__action js-increment"
                    aria-label="Zvýšit počet kusov"
                    @click=${onIncrement}
                >
                    +
                </button>
            </div>

            <button
                class="c-solution-products__buttons__cart"
                @click=${addToCart}
                aria-label="Pridať do košíka"
            >
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="sp-icon"
                >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path
                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
                    />
                </svg>

                <span class="sp-text">Do košíka</span>
            </button>
        </div>
    </div>`;
};
