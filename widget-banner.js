import { LitElement, html, css } from 'lit';

import './widget-button-group';
import './widget-text-box';

export class WidgetBanner extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 0;
        padding: 0;
      }

      .cly-widget-banner {
        display: flex;
        flex-direction: column;
        gap: 8px;

        padding: 8px;
        border: none;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0px 6px 6px 0px #78787817;
      }

      .cly-widget-banner__body {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 24px;
      }

      .cly-widget-banner__image {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    `;
  }

  static get properties() {
    return {
      banner: {
        converter: value => JSON.parse(value),
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.banner = {}
  }

  _getButtonGroup() {
    const { buttonGroup } = this.banner || {};

    return html`
      <cly-widget-button-group
        buttonGroup=${JSON.stringify(buttonGroup)}
        class="cly-widget-banner__footer"
      ></cly-widget-button-group>`;
  }

  _getImage() {
    const { image } = this.banner || {};

    return html`<img class="cly-widget-banner__image" src="${image}">`;
  }

  _getText() {
    const { textBox } = this.banner || {};

    return html`<cly-widget-text-box textBox=${JSON.stringify(textBox)}></cly-widget-text-box>`;
  }

  render() {
    return html`
      <div class="cly-widget-banner">
        <div class="cly-widget-banner__body">
          ${this._getImage()}
          ${this._getText()}
        </div>
        ${this._getButtonGroup()}
      </div>
    `;
  }
}

window.customElements.define('cly-widget-banner', WidgetBanner);
