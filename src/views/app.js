/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-item/paper-item.js';
import '../components/book-searchbar/book-searchbar.js';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class App extends PolymerElement {
    static get template() {
        return html`
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style> 
      <style>
        :host {

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #000;
          background-color: #fff;
          border-bottom: 1px solid #ddd;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        
        .app__viewContainer {
            height: 100%;
            margin: 0 0 0 32px;
        }
        
        .app__loadingContainer {
            position: relative;
            width: 100%;
            height: 100%;
        }
        
        paper-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 55px;
            height: 55px;
            bottom: 50%;
            --paper-spinner-layer-1-color: purple;
            --paper-spinner-layer-2-color: purple;
            --paper-spinner-layer-3-color: purple;
            --paper-spinner-layer-4-color: purple;
            --paper-spinner-stroke-width: 5px;
        }
        
        .app__drawer {
            border-left: 1px solid #ddd;
        }
        
        .app__navigation {
             margin-top: -90px;
        }
        
        paper-item {
            cursor: pointer;
        }
      </style>
      
      <iron-ajax
        auto
        url="[[bookDetailsEndpoint]]"
        params=''
        handle-as="json"
        on-response="_handleLoadBookDetails"
        debounce-duration="300"
      ></iron-ajax>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      
   
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall" class="app_header">
            <app-toolbar class="app__headerToolbar">
              <div class="auto">
                <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              </div>
              <div class="flex">
                <book-searchbar title="[[title]]"></book-searchbar>
              </div>
              <div class="auto"></div>
              
            </app-toolbar>
          </app-header>

          
          
        </app-header-layout>
        <app-drawer-layout class="app__drawerLayout" fullbleed="" narrow="{{narrow}}" style="margin-top: 65px">
         <div class="app__viewContainer" hidden="[[loading]]">
            <iron-pages class="app__pages" selected="[[page]]" attr-for-selected="name" role="main">
              <book-landing-view 
                loading="[[loading]]" 
                name="details"
                contributors="[[contributors]]"
                title="[[title]]"
                date="[[date]]"
                summary="[[summary]]"
                cover-url="[[coverUrl]]" 
                isbn="[[isbn]]"
                publisher="[[publisher]]" 
                flags="[[flags]]"
              ></book-landing-view>
              <book-copyright-view loading="[[loading]]" name="copyright"></book-copyright-view>
              <book-preface-view loading="[[loading]]" name="preface"></book-preface-view>
              <book-toc-view toc-endpoint="../mocks/toc.html" title="[[title]]" toc="[[toc]]" loading="[[loading]]" name="toc"></book-toc-view>
            </iron-pages>
         </div>
         
        <div class="app__loadingContainer" hidden="[[!loading]]">
            <paper-spinner active="[[loading]]"></paper-spinner>
        </div>
        
        
         <!-- Drawer content -->
          <app-drawer class="app__drawer" id="drawer" slot="drawer"align="end" swipe-open="[[narrow]]" style="position: fixed; top: 65px;">
                <div class="app__navigation">
                    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                      <paper-item name="details" href="[[rootPath]]" on-tap="_handleNavigationClick" class="app__menuItem">Book Details</paper-item>
                      <paper-item name="copyright" href="[[rootPath]]copyright" on-tap="_handleNavigationClick" class="app__menuItem">Copyright</paper-item>
                      <paper-item name="preface" href="[[rootPath]]preface" on-tap="_handleNavigationClick" class="app__menuItem">Preface</paper-item>
                      <paper-item name="toc" href="[[rootPath]]toc" on-tap="_handleNavigationClick" class="app__menuItem">Table of Contents</paper-item>
                    </iron-selector> 
                </div>
          </app-drawer>
      </app-drawer-layout>
    `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            bookDetailsEndpoint: {
                type: String,
                value: "../mocks/bookDetails.json"
            },
            routeData: Object,
            subroute: Object,
            loading: {
                type: Boolean,
                value: true
            },
            // book attributes
            contributors: Array,
            date: String,
            flags: Object,
            isbn: String,
            pathTo: Object,
            title: String,
            toc: Array,
            summary: String,
            coverUrl: {
                type: String,
                value: "https://d1re4mvb3lawey.cloudfront.net/pg1017/cover.jpg"
            },
            publisher: {
                type: String,
                value: "ValdeBooks"
            }
        };
    }

    static get observers() {
        return [
            '_routePageChanged(routeData.page)'
        ];
    }

    _routePageChanged(page) {
        if (!page || page.trim().length === 0) {
            this.page = 'details';
        } else if (['copyright', 'preface', 'toc'].indexOf(page) !== -1) {
            this.page = page;
        } else {
            this.page = 'details';
        }

        // Close a non-persistent drawer when the page & route are changed.
        if (!this.$.drawer.persistent) {
            this.$.drawer.close();
        }
    }

    _pageChanged(page) {
        switch (page) {
            case 'details':
                import('./book-landing-view.js');
                break;
            case 'copyright':
                import('./book-copyright-view.js');
                break;
            case 'preface':
                import('./book-preface-view.js');
                break;
            case 'toc':
                import('./book-toc-view.js');
                break;

        }
    }

    _handleLoadBookDetails(response) {

        const data = response.detail.parseResponse();
        this.loading = false;
        this.contributors = data.contributors || [];
        this.date = data.date || "";
        this.flags = data.flags || {};
        this.isbn = data.isbn || "";
        this.pathTo = data.pathTo || {};
        this.title = data.title || "";
        this.summary = data.summary || "";
        this.toc = data.toc || [];
    }

    _handleNavigationClick(e) {
        this.set('route.path', e.target.href);
    }
}

window.customElements.define('bibliotech-app', App);
