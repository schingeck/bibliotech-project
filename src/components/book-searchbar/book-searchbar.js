import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';

class BookSearchbar extends PolymerElement {
    static get properties() {
        return {
            title: String
        };
    }

    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
        <style>
        
            .input-wrapper {
                margin-top: -75px !important;
            }
          
            .BookSearchbar__input {
                --paper-input-container: {
                    margin-left: auto;
                    max-width: 550px;
                    margin-right: auto;
                }
            
                --paper-input-container-input_-_margin-top: -25px;
                
                --paper-input-container-input: {
              
                    padding-left: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    margin-top: -15px;
                    background-color: #fff;
                    max-height: 45px;
                    line-height: 45px;
                }
                
                
                --paper-input-container-underline-focus: {
                    display: none;
                }
                
                --paper-input-container-underline: {
                    display: none;
                }
                
                --paper-input-container-label: {
                    margin-top:-15px;
                }
                --paper-input-container-input-align: center;
            
               
            }
        </style>
        <paper-input placeholder="Search [[title]]" class="BookSearchbar__input"></paper-input>
    `;
    }
}

window.customElements.define('book-searchbar', BookSearchbar);
