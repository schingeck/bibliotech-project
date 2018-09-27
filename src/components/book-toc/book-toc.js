import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax';

class BookToc extends PolymerElement {

    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
          <iron-ajax
            id="ajax"
            url="[[tocEndpoint]]"
            params=''
            handle-as="document"
            on-response="_handleLoadToc"
            debounce-duration="900"
          ></iron-ajax>
        <div class="BookToc__tocContainer" load="[[tocEndpoint]]"></div>
    `;
    }

    static get properties() {
        return {
            html: HTMLDocument,
            tocEndpoint: {
                type: String,
                observer: "_handleChangeTocEndpoint"
            }
        };
    }

    loadToc() {
        this._handleChangeTocEndpoint(this.tocEndpoint);
    }

    _handleChangeTocEndpoint(endpoint) {
        this.shadowRoot.querySelector("#ajax").generateRequest();
    }

    _handleLoadToc(response) {
        this.set("html", response.detail.parseResponse());
        this.shadowRoot.querySelector(".BookToc__tocContainer").appendChild(this.html.documentElement);
    }
}

window.customElements.define('book-toc', BookToc);
