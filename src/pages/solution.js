import { html } from "lit-html";
import { renderCategoryCard } from "../components/categoryCard.js";
import { renderProductCard } from "../components/productCard.js";
import { renderSecretModal } from "../components/secretModal.js";
import { loadData } from "../dataLoader.js";
import { showToast } from "../components/toast.js";
import { renderNoDataMessage } from "../components/noData.js";

/**
 * Solution Page
 */

let _quantities = {};
let cart = [];

const initQuantities = (products) => {
    products.forEach((product) => (_quantities[product.id] = 1));
};

// CTA button click handler
const handleCtaClick = () => {
    // TODO: Implement email form/modal

    const modal = document.querySelector(".js-modal");
    const modalForm = document.querySelector(".js-modal-form");

    modal.classList.toggle("is-open");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        modalForm.querySelector("input, button").focus();
    }, 50);
};

// Banner button click handler
const handleBannerClick = () => {
    // TODO: Navigate to products or filter
    const productSection = document.querySelector(".c-solution-content");
    productSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Product card functionality
const handleUpdateQuantity = (product, action) => {
    if (!product) return;

    const currentQuantity = _quantities[product.id] || 1;
    const newQuantity = currentQuantity + action;
    if (newQuantity < 1 || newQuantity > 10) return;

    _quantities[product.id] = newQuantity;

    const card = document.querySelector(`[data-product-id="${product.id}"]`);

    if (!card) return;

    card.querySelector(".js-quantity").textContent = newQuantity;
    card.querySelector(".js-decrement").disabled = newQuantity <= 1;
    card.querySelector(".js-increment").disabled = newQuantity >= 10;
};

const handleAddToCart = (product) => {
    const quantity = _quantities[product.id];

    const isInCart = cart.find((item) => item.id === product.id);

    const toastMessage =
        quantity > 1
            ? `${quantity}ks produktu ${product.name} bolo pridaných do košíka`
            : `${quantity}ks produktu ${product.name} bol pridaný do košíka`;

    if (isInCart && isInCart.quantity + quantity > 10) {
        const remaining = 10 - isInCart.quantity;

        if (remaining <= 0) {
            showToast("error", "Maximálny počet kusov na produkt je 10");
            return;
        }

        cart = cart.map((item) => (item.id === product.id ? { ...item, quantity: 10 } : item));

        showToast("warning", `Pridaných len ${remaining}ks. Dosiahnutý limit 10ks na produkt`);
        return;
    }

    if (isInCart) {
        cart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );

        showToast("success", toastMessage);
        return;
    }

    const newItem = { ...product, quantity };

    cart.push(newItem);
    showToast("success", toastMessage);
};

// Solution main banner
const solutionBanner = (banner) => html`
    <div class="c-solution-banner">
        <div class="c-solution-banner__image"></div>
        <div class="c-solution-banner__overlay"></div>
        <div class="c-solution-banner__content">
            <h1 class="c-solution-banner__content__title">${banner.title}</h1>
            <div class="c-solution-banner__content__description">${banner.description}</div>
            <button class="c-solution-banner__content__button" @click=${() => handleBannerClick()}>
                <span class="sb-text">${banner.ctaText}</span>
                <svg
                    aria-hidden="true"
                    class="sb-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

// Solution CTA section
const solutionCta = (ctaBanner) => html`
    <div class="c-solution-cta">
        <div class="c-solution-cta__image"></div>

        <div class="c-solution-cta__overlay"></div>

        <div class="c-solution-cta__content">
            <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

            <div class="c-solution-cta__content__description">${ctaBanner.description}</div>

            <button
                class="c-solution-cta__content__button js-cta-button"
                @click=${() => handleCtaClick()}
            >
                <span class="sc-text">${ctaBanner.ctaText}</span>

                <svg
                    aria-hidden="true"
                    class="sc-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.16663 10H15.8333M15.8333 10L9.99996 4.16669M15.8333 10L9.99996 15.8334"
                        stroke="currentColor"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
`;

// Solution Product
const solutionProduct = (products) => {
    if (!products || products.length === 0) {
        return renderNoDataMessage("Žiadne produkty nie sú dostupné");
    }

    return html` <div class="c-solution-products">
        ${products.map((product) =>
            renderProductCard(
                product,
                _quantities[product.id] ?? 1,
                () => handleUpdateQuantity(product, -1),
                () => handleUpdateQuantity(product, +1),
                () => handleAddToCart(product)
            )
        )}
    </div>`;
};

// Solution Categories
const solutionCategories = (categories) => {
    if (!categories || categories.length === 0) {
        return renderNoDataMessage("Kategórie sa nepodarilo načítať");
    }

    return html`
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>

        <section class="c-solution-categories__grid">
            ${categories.map((category, i) => renderCategoryCard(category, i))}
        </section>
    `;
};
// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    return html`
        <div class="l-solution">
            <div class="l-solution__banner">
                <div class="l-container">${data.banner ? solutionBanner(data.banner) : html``}</div>
            </div>

            <div class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>

                        <div class="c-solution-content__products">
                            ${data.products ? solutionProduct(data.products) : html``}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-container is-shorter">
                    <section class="c-solution-categories">
                        ${data.categories ? solutionCategories(data.categories) : html``}
                    </section>
                </div>
            </div>
        </div>
        ${renderSecretModal()}
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();

        if (data?.products?.length) {
            initQuantities(data.products);
        }

        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
