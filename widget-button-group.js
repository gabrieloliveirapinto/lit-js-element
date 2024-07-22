import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { 
  WIDGET_BUTTON_GROUP,
  getConvertedButtonGroup,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
} from './utils/button-group';

import './widget-button';

export class WidgetButtonGroup extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
      }

      .cly-widget-button-group__button {
        flex-grow: 1;
      }

      ${unsafeCSS(getCustomizableStyleClasses())}
    `
  }

  static get properties() {
    return {
      buttonGroup: {
        converter: getConvertedButtonGroup,
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.buttonGroup = JSON.parse(JSON.stringify(WIDGET_BUTTON_GROUP));
  }

  _getButtons() {
    const { contents } = this.buttonGroup || {};
    const { buttons } = contents || {};

    if (!Array.isArray(buttons) || !buttons.length) return '';

    return buttons.map(button => html`
      <cly-widget-button
        button=${JSON.stringify(button)}
        class="cly-widget-button-group__button"
      ></cly-widget-button>
    `);
  }

  _getButtonGroupStyles() {
    const { styles } = this.buttonGroup || {};

    return getCustomizableStyleVariables(styles);
  }

  render() {
    return html`
      <div
        class="cly-widget-button-group"
        style="${styleMap(this._getButtonGroupStyles())}"
      >
        ${this._getButtons()}
      </div>
    `;
  }
}

window.customElements.define('cly-widget-button-group', WidgetButtonGroup);
