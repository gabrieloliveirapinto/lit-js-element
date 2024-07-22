import { HTML_REGEX, STYLE_UNIT_PIXEL } from './global';

const WIDGET_TEXT_BOX_CONTENT_TEXT_KEY = 'text';

const WIDGET_TEXT_BOX_CONTENT_KEYS = [
  WIDGET_TEXT_BOX_CONTENT_TEXT_KEY
];

const WIDGET_TEXT_BOX_STYLE_FONT_FAMILY_KEY = 'fontFamily';
const WIDGET_TEXT_BOX_STYLE_FONT_SIZE_KEY = 'fontSize';
const WIDGET_TEXT_BOX_STYLE_FONT_WEIGHT_KEY = 'fontWeight';
const WIDGET_TEXT_BOX_STYLE_TEXT_COLOR_KEY = 'textColor';

const WIDGET_TEXT_BOX_STYLE_KEYS = [
  WIDGET_TEXT_BOX_STYLE_FONT_FAMILY_KEY,
  WIDGET_TEXT_BOX_STYLE_FONT_SIZE_KEY,
  WIDGET_TEXT_BOX_STYLE_FONT_WEIGHT_KEY,
  WIDGET_TEXT_BOX_STYLE_TEXT_COLOR_KEY
];

const WIDGET_TEXT_BOX_FONT_FAMILY_VARIABLE = '--font-family';
const WIDGET_TEXT_BOX_FONT_SIZE_VARIABLE = '--font-size';
const WIDGET_TEXT_BOX_FONT_WEIGHT_VARIABLE = '--font-weight';
const WIDGET_TEXT_BOX_TEXT_COLOR_VARIABLE = '--text-color';

const WIDGET_TEXT_BOX_DEFAULT_FONT_FAMILY = 'Inter';
const WIDGET_TEXT_BOX_DEFAULT_FONT_SIZE = 16;
const WIDGET_TEXT_BOX_DEFAULT_FONT_WEIGHT = 'regular';
const WIDGET_TEXT_BOX_DEFAULT_TEXT = '';
const WIDGET_TEXT_BOX_DEFAULT_TEXT_COLOR = '#000000';

const WIDGET_TEXT_BOX_CONTENTS = {
  [WIDGET_TEXT_BOX_CONTENT_TEXT_KEY]: WIDGET_TEXT_BOX_DEFAULT_TEXT
};

const WIDGET_TEXT_BOX_STYLES = {
  [WIDGET_TEXT_BOX_STYLE_FONT_FAMILY_KEY]: {
    variable: WIDGET_TEXT_BOX_FONT_FAMILY_VARIABLE,
    value: ''
  },
  [WIDGET_TEXT_BOX_STYLE_FONT_SIZE_KEY]: {
    variable: WIDGET_TEXT_BOX_FONT_SIZE_VARIABLE,
    value: '',
    unit: STYLE_UNIT_PIXEL
  },
  [WIDGET_TEXT_BOX_STYLE_FONT_WEIGHT_KEY]: {
    variable: WIDGET_TEXT_BOX_FONT_WEIGHT_VARIABLE,
    value: ''
  },
  [WIDGET_TEXT_BOX_STYLE_TEXT_COLOR_KEY]: {
    variable: WIDGET_TEXT_BOX_TEXT_COLOR_VARIABLE,
    value: ''
  }
};

const WIDGET_TEXT_BOX = {
  contents: WIDGET_TEXT_BOX_CONTENTS,
  styles: WIDGET_TEXT_BOX_STYLES
}


const isTextWithHTML = (text) => HTML_REGEX.test(text);

const getConvertedTextBox = (textBox = null) => {
  const data = JSON.parse(JSON.stringify(WIDGET_TEXT_BOX));

  if (!textBox) return data;

  const { contents, styles } = data;
  const parsedTextBox = JSON.parse(textBox);
  const parsedTextBoxKeys = Object.keys(parsedTextBox);

  for (const key of parsedTextBoxKeys) {
    if (typeof parsedTextBox[key] !== 'undefined') {
      const isContentKey = WIDGET_TEXT_BOX_CONTENT_KEYS.includes(key);
      const isStyleKey = WIDGET_TEXT_BOX_STYLE_KEYS.includes(key);

      if (isContentKey) contents[key] = parsedTextBox[key];
      else if (isStyleKey) styles[key].value = parsedTextBox[key];
    }
  }

  return data;
};

const getCustomizableStyleClasses = () => {
  return `
    * {
      ${WIDGET_TEXT_BOX_FONT_FAMILY_VARIABLE}: ${WIDGET_TEXT_BOX_DEFAULT_FONT_FAMILY};
      ${WIDGET_TEXT_BOX_FONT_SIZE_VARIABLE}: ${WIDGET_TEXT_BOX_DEFAULT_FONT_SIZE}${STYLE_UNIT_PIXEL};
      ${WIDGET_TEXT_BOX_FONT_WEIGHT_VARIABLE}: ${WIDGET_TEXT_BOX_DEFAULT_FONT_WEIGHT};
      ${WIDGET_TEXT_BOX_TEXT_COLOR_VARIABLE}: ${WIDGET_TEXT_BOX_DEFAULT_TEXT_COLOR};
    }

    .cly-widget-banner__text {
      color: var(${WIDGET_TEXT_BOX_TEXT_COLOR_VARIABLE});
      font-family: var(${WIDGET_TEXT_BOX_FONT_FAMILY_VARIABLE});
      font-size: var(${WIDGET_TEXT_BOX_FONT_SIZE_VARIABLE});
      font-weight: var(${WIDGET_TEXT_BOX_FONT_WEIGHT_VARIABLE});
    }

    .cly-widget-banner__text--with-html p {
      margin: 0;
      padding: 0;
    }

    .cly-widget-banner__text--with-html p:not(:last-child) {
      margin-bottom: 8px;
    }
  `;
}

const getCustomizableStyleVariables = (textBoxStyles = {}) => {
  const finalStyles = {};

  if (!Object.keys(textBoxStyles).length) return finalStyles;

  for (const key of WIDGET_TEXT_BOX_STYLE_KEYS) {
    const { value, variable, unit = '' } = textBoxStyles[key];

    finalStyles[variable] = `${value}${unit}`;
  }

  return finalStyles;
}

export default {
  WIDGET_TEXT_BOX,
  isTextWithHTML,
  getConvertedTextBox,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
}

export {
  WIDGET_TEXT_BOX,
  isTextWithHTML,
  getConvertedTextBox,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
}
