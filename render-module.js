import { html } from 'lit';
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';

import {
  WIDGET_BUTTON_ACTION_TYPE_CLOSE,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE_VALUE
} from './utils/button';

import {
  WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH
} from './utils/button-group';


import './widget-banner';

const banner = JSON.stringify({
  buttonGroup: {
    buttons: [
      {
        action: {
          type: WIDGET_BUTTON_ACTION_TYPE_CLOSE,
          value: WIDGET_BUTTON_ACTION_TYPE_CLOSE_VALUE
        },
        background: {
          normal: 'green'
        },
        textColor: {
          normal: 'aqua'
        },
        text: 'Skip'
      },
      {
        text: 'Go to checkout'
      }
    ],
    position: WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH,
    spaceBetween: 8
  },
  image: 'https://placehold.co/600x400/EEE/31343C',
  textBox: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
    text: 'wil it be <p style="color: blue">wrapped in a div</p> <p style="color: blue">wrapped in a div</p>',
    textColor: '#00FF00'
  }
});

const contents = await collectResult(render(html`
  <cly-widget-banner banner=${banner}></cly-widget-banner>
`));

console.log(contents);
document.getElementById('body').innerHTML = contents;
