import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import {
  WIDGET_TEXT_BOX,
  isTextWithHTML,
  getConvertedTextBox,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
} from './utils/text-box';

export class WidgetTextBox extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
      }

      * {
        margin: 0;
        padding: 0;
      }

      ${unsafeCSS(getCustomizableStyleClasses())}
    `;
  }

  static get properties() {
    return {
      textBox: {
        converter: getConvertedTextBox,
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.textBox = JSON.parse(JSON.stringify(WIDGET_TEXT_BOX));
  }

  _getTextBoxStyles() {
    const { styles } = this.textBox || {};

    return getCustomizableStyleVariables(styles);
  }

  render() {
    const { contents } = this.textBox || {};
    const { text = '' } = contents || {};

    if (!text) return '';

    return isTextWithHTML(text) ?
      html`
        <div
          class="cly-widget-banner__text cly-widget-banner__text--with-html"
          style="${styleMap(this._getTextBoxStyles())}"
        >
          ${unsafeHTML(text)}
        </div>
      ` :
      html`
        <p
          class="cly-widget-banner__text"
          style="${styleMap(this._getTextBoxStyles())}"
        >
          ${text}
        </p>
      `;
  }
}

window.customElements.define('cly-widget-text-box', WidgetTextBox);
