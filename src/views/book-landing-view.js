import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '../components/book-overview/book-overview.js';
import '../components/book-summary/book-summary.js';
import '../components/book-rating/book-rating';

class BookLandingView extends PolymerElement {
    static get properties() {
        return {
            loading: {
                type: Boolean,
                reflectToAttribute: true
            },
            // book attributes
            contributors: Array,
            date: String,
            flags: Object,
            isbn: String,
            title: String,
            coverUrl: String,
            publisher: String,
            summary: String
        };
    }

    static get template() {
        return html`
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .BookLandingView__bookOverviewContainer {
            width: 225px;
        }
        .BookLandingView__summaryContainer {
            margin: 15px auto 15px auto;
            max-width: 700px;
            padding: 14px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
      </style>

      <div class="BookLandingView">
        <h1>Book Details</h1>
        <h2>[[title]] ([[date]])</h2>
        
        <div class="BookLandingView__container wrap layout horizontal">
            <div class="auto BookLandingView__bookOverviewContainer">
                 <book-overview 
                    contributors="[[contributors]]"
                    flags="[[flags]]"
                    isbn="[[isbn]]"
                    title="[[title]]"
                    publisher="[[publisher]]"
                    cover-url="[[coverUrl]]"
                ></book-overview>
            </div>
            <div class="flex-8 BookLandingView__summaryContainer">
                <book-rating rating="4"></book-rating>
                <book-summary summary="[[summary]]"></book-summary> 
            </div>
           
        </div>
        
        </div>
    `;
    }
}

window.customElements.define('book-landing-view', BookLandingView);
