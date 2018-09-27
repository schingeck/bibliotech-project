import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class BookSummary extends PolymerElement {
    static get properties() {
        return {
            summary: String
        };
    }
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
        
        <div class="BookSummary">[[summary]]</div>
    `;
    }
}

window.customElements.define('book-summary', BookSummary);
