import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';


class BookOverviewCover extends PolymerElement {
    static get properties() {
        return {
            coverUrl: String,
            title: String
        };
    }

    static get template() {
        return html`
        <style>
            .BookOverviewCover__container {
                position: relative;
                width: 164px;
                height: 220px;
                text-align: center;
                border: 1px solid #ddd;
                margin: auto 0 10px auto;
            }
            iron-image {
                width: 100%;
                height: 100%;
            }
            .BookOverviewCover__title {
                position: absolute;
                width: 164px;
                padding: 10px 0 10px 0;
             
                background-color: rgba(256, 256, 256, 0.85);
                font-weight: Bold;
                bottom: 0;
                left: 0;
                font-size: 0.75rem;
            }
            .BookOverviewCover {
                text-align: center;
            }
        </style>
         <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
        <li class="BookOverviewCover">
            <div class="BookOverviewCover__container">
                <iron-image sizing="cover" title="[[title]]" preload fade class="BookOverviewCover__img" src="[[coverUrl]]"></iron-image>
                <div class="BookOverviewCover__title">[[title]]</div>
            </div>
        </li>
    `;
    }
}

window.customElements.define('book-overview-cover', BookOverviewCover);
