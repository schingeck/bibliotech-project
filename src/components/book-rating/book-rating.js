import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class BookRating extends PolymerElement {
    static get properties() {
        return {
            rating: {
                type: Number,
                observer: "_handleChangeRating"
            },
            ratingIcons: {
                type: Array,
                notifies: true
            }
        };
    }

    static get template() {
        return html`
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
      <style>
        :host { 
            padding: 5px 0px 3px 5px;
        }
        iron-icon {
            --iron-icon-fill-color: purple;
            --iron-icon-stroke-color: rgba(0, 0, 0, 0.1);
        }
        </style>
        <div class="BookRating">
            <template is="dom-repeat" items="{{ratingIcons}}">
                <iron-icon icon="{{item}}"></iron-icon>
            </template>
        </div>
    `;
    }

    _handleChangeRating(rating) {
        let ratings = [];
        for(let i = 1; i <= 5; i++) {
            if(i <= rating) {
                ratings.push("star");
            } else {
                ratings.push("star-border");
            }
        }
        this.set("ratingIcons",ratings);
        this.notifyPath("ratingIcons");
    }
}

window.customElements.define('book-rating', BookRating);
