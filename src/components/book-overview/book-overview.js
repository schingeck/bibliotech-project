import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './book-overview-contributors.js';
import './book-overview-cover.js';
import './book-overview-isbn.js';
import './book-overview-publisher';

class BookOverview extends PolymerElement {
    static get properties() {
        return {
            // book attributes
            contributors: Array,
            flags: Object,
            isbn: String,
            coverUrl: String,
            title: String,
            publisher: String
        };
    }

    static get template() {
        return html`
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          --book-overview-item-title-color: #777;
          --book-overview-item-color: #777;
        }
        
        .BookOverview {
            list-style: none;
            font-size: 14px;
        }
      </style>
    
        <ul class="BookOverview">
            <book-overview-cover class="BookOverview__cover" title="[[title]]" cover-url="[[coverUrl]]"></book-overview-cover>
            <book-overview-isbn isbn="[[isbn]]"></book-overview-isbn>
            <book-overview-publisher publisher="[[publisher]]"></book-overview-publisher>
            <book-overview-contributors contributors="[[contributors]]"></book-overview-contributors>
        </ul>
    `;
    }
}

window.customElements.define('book-overview', BookOverview);
