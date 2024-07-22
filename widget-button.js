import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import {
  WIDGET_BUTTON_DEFAULT_TEXT,
  WIDGET_BUTTON,
  WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE,
  WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK,
  WIDGET_BUTTON_ACTION_TYPES,
  getConvertedButton,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
} from './utils/button';

export class WidgetButton extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
      }

      button {
        display: block;
        cursor: pointer;
        outline: none;
        width: 100%;
        margin: 0;
        border: none;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }

      ${unsafeCSS(getCustomizableStyleClasses())}
    `;
  }

  static get properties() {
    return {
      button: {
        converter: getConvertedButton,
        type: Object
      },
    };
  }

  constructor() {
    super();
    this.button = JSON.parse(JSON.stringify(WIDGET_BUTTON));
  }

  _getButtonText() {
    const { contents } = this.button || {};
    const { text } = contents || {};

    return text || WIDGET_BUTTON_DEFAULT_TEXT;
  }

  _getButtonStyles() {
    const { styles } = this.button || {};

    return getCustomizableStyleVariables(styles);
  }

  _onButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const { contents } = this.button || {};
    const { action } = contents || {};
    const { type, value } = action || {};

    if (WIDGET_BUTTON_ACTION_TYPES.includes(type)) {
      if (type === WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN) {
        // TODO
      } else if (type === WIDGET_BUTTON_ACTION_TYPE_CLOSE) {
        window.location.href += value;
      } else if (type === WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK){
        // TODO
      }
    }
  }

  render() {
    return html`
      <button
        class="cly-widget-button"
        style=${styleMap(this._getButtonStyles())}
        @click="${this._onButtonClick}"
      >
        ${this._getButtonText()} ${this.test}
      </button>
    `;
  }
}

window.customElements.define('cly-widget-button', WidgetButton);
