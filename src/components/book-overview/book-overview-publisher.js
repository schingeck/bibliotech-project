import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class BookOverviewPublisher extends PolymerElement {
    static get properties() {
        return {
            publisher: String
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
            <span class="BookOverview__itemTitle"><b>Publisher</b></span>
    
            <span class="BookOverview__item"> | [[publisher]]</span>
        </li>
    `;
    }
}

window.customElements.define('book-overview-publisher', BookOverviewPublisher);
