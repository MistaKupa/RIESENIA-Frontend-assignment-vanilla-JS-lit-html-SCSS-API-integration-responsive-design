import { html } from "lit-html";
import upratovanie from "../assets/images/categories/cistenie_a_upratovanie.jpg";
import elektrickeNaradie from "../assets/images/categories/elektricke_naradie.jpg";
import prislusenstvo from "../assets/images/categories/prislusenstvo.jpg";
import rucneNaradie from "../assets/images/categories/rucne_naradie.jpg";
import zahradaLes from "../assets/images/categories/zahrada_a_les.jpg";
import fallbackImage from "../assets/images/fallback.jpg";

const categoriesImages = {
    "Elektrické náradie": elektrickeNaradie,
    "Záhrada a Les": zahradaLes,
    "Čistenie a upratovanie": upratovanie,
    "Ručne náradie": rucneNaradie,
    Príslušenstvo: prislusenstvo,
};

export const renderCategoryCard = (category) => {
    const {
        ctaText,
        name,
        productCount,
        link,
        subcategories,
        imageUrl: placeholderImage,
    } = category;

    const currentImage = categoriesImages[category.name] || placeholderImage || fallbackImage;

    // const cardSize =
    //     subcategories.length > 6 ? "is-tall" : subcategories.length > 3 ? "is-wide" : "";

    return html`
        <div class="c-solution-grid-card">
            <img class="c-solution-grid-card__image" src="${currentImage}" alt="${name} obrazok" />

            <div class="c-solution-grid-card__overlay"></div>

            <div class="c-solution-grid-card__wrapper">
                <div class="c-solution-grid-card__wrapper__content">
                    <div class="c-solution-grid-card__wrapper__content__heading">
                        <h3>${name}</h3>
                        <span>${productCount}</span>
                    </div>

                    <ul class="c-solution-grid-card__wrapper__content__list">
                        ${subcategories?.map((subCat) => {
                            return html`
                                <li>
                                    <span>&ndash;</span>
                                    <a href="${subCat.link}">${subCat.name}</a>
                                </li>
                            `;
                        })}
                    </ul>

                    <div class="c-solution-grid-card__wrapper__content__cta">
                        <a href="${link}">${ctaText}</a>
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
                                stroke-width="1.3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
};
