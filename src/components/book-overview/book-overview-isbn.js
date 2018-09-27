import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class BookOverviewISBN extends PolymerElement {
    static get properties() {
        return {
            isbn: String
        };
    }

    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
         <style>
            .BookOverview__itemTitle {
                color: var(--book-overview-item-title-color);
            }
            
            .BookOverview__item {
                color: var(--book-overview-item-color);
            }
        </style>
        <li>
            <span class="BookOverview__itemTitle"><b>ISBN</b></span>
         
            <span class="BookOverview__item"> | [[isbn]]</span>
        </li>
    `;
    }
}

window.customElements.define('book-overview-isbn', BookOverviewISBN);
