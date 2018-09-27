import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '../components/book-toc/book-toc';

class BookTocView extends PolymerElement {
    static get properties() {
        return {
            title: String,
            tocEndpoint: String
        };
    }
    static get template() {
        return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="BookTocView">
        <h1>Table of Contents</h1>
        <h2>[[title]]</h2>
        <h2></h2>
        <book-toc toc-endpoint="[[tocEndpoint]]"></book-toc>    
    </div>
    `;
    }
}

window.customElements.define('book-toc-view', BookTocView);
