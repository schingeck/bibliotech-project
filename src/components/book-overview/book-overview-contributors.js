import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class BookOverviewContributors extends PolymerElement {
    static get properties() {
        return {
            contributors: Array
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
            <span class="BookOverview__itemTitle">
                <b>Contributors</b>
            </span>
          
            <span class="BookOverview__item">
                | [[_renderContributors(contributors)]]
            </span>
      </li>
    `;
    }

    _renderContributors(contributors) {
        if(!contributors) {
            return '';
        }
        return contributors.join(", ");
    }
}

window.customElements.define('book-overview-contributors', BookOverviewContributors);
