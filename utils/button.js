import { STYLE_UNIT_PIXEL } from './global';


const WIDGET_BUTTON_CONTENT_ACTION_KEY = 'action';
const WIDGET_BUTTON_CONTENT_TEXT_KEY = 'text';

const WIDGET_BUTTON_CONTENT_KEYS = [
  WIDGET_BUTTON_CONTENT_ACTION_KEY,
  WIDGET_BUTTON_CONTENT_TEXT_KEY
];

const WIDGET_BUTTON_STYLE_BACKGROUND_KEY = 'background';
const WIDGET_BUTTON_STYLE_BORDER_RADIUS_KEY = 'borderRadius';
const WIDGET_BUTTON_STYLE_FONT_FAMILY_KEY = 'fontFamily';
const WIDGET_BUTTON_STYLE_PADDING_KEY = 'padding';
const WIDGET_BUTTON_STYLE_TEXT_COLOR_KEY = 'textColor';

const WIDGET_BUTTON_CONTENT_STYLE_KEYS = [
  WIDGET_BUTTON_STYLE_BACKGROUND_KEY,
  WIDGET_BUTTON_STYLE_BORDER_RADIUS_KEY,
  WIDGET_BUTTON_STYLE_FONT_FAMILY_KEY,
  WIDGET_BUTTON_STYLE_PADDING_KEY,
  WIDGET_BUTTON_STYLE_TEXT_COLOR_KEY
];

const WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN = 'another-screen';
const WIDGET_BUTTON_ACTION_TYPE_CLOSE = 'close';
const WIDGET_BUTTON_ACTION_TYPE_CLOSE_VALUE = '&cly_x_close=1';
const WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK = 'url-or-deep-link';
const WIDGET_BUTTON_ACTION_TYPES = [
  WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE,
  WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK
];

const WIDGET_BUTTON_BORDER_RADIUS_VARIABLE = '--border-radius';
const WIDGET_BUTTON_FONT_FAMILY_VARIABLE = '--font-family';
const WIDGET_BUTTON_HORIZONTAL_PADDING_VARIABLE = '--horizontal-padding';
const WIDGET_BUTTON_HOVER_BACKGROUND_VARIABLE = '--hover-background';
const WIDGET_BUTTON_HOVER_COLOR_VARIABLE = '--hover-text-color';
const WIDGET_BUTTON_NORMAL_BACKGROUND_VARIABLE = '--normal-background';
const WIDGET_BUTTON_NORMAL_COLOR_VARIABLE = '--normal-text-color';
const WIDGET_BUTTON_VERTICAL_PADDING_VARIABLE = '--vertical-padding';

const WIDGET_BUTTON_DEFAULT_BORDER_RADIUS = 8;
const WIDGET_BUTTON_DEFAULT_FONT_FAMILY = 'Inter';
const WIDGET_BUTTON_DEFAULT_HORIZONTAL_PADDING = 16;
const WIDGET_BUTTON_DEFAULT_HOVER_BACKGROUND = '#F6F6F6';
const WIDGET_BUTTON_DEFAULT_HOVER_COLOR = '#0166D6';
const WIDGET_BUTTON_DEFAULT_NORMAL_BACKGROUND = '#0166D6';
const WIDGET_BUTTON_DEFAULT_NORMAL_COLOR = '#F6F6F6';
const WIDGET_BUTTON_DEFAULT_TEXT = 'Click me';
const WIDGET_BUTTON_DEFAULT_VERTICAL_PADDING = 8;


const WIDGET_BUTTON_CONTENTS = {
  [WIDGET_BUTTON_CONTENT_ACTION_KEY]: {
    type: '',
    value: ''
  },
  [WIDGET_BUTTON_CONTENT_TEXT_KEY]: WIDGET_BUTTON_DEFAULT_TEXT
};

const WIDGET_BUTTON_STYLES = {
  [WIDGET_BUTTON_STYLE_BACKGROUND_KEY]: {
    isComposedStyle: true,
    normal: {
      variable: WIDGET_BUTTON_NORMAL_BACKGROUND_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_NORMAL_BACKGROUND
    },
    hover: {
      variable: WIDGET_BUTTON_HOVER_BACKGROUND_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_HOVER_BACKGROUND
    }
  },
  [WIDGET_BUTTON_STYLE_BORDER_RADIUS_KEY]: {
    variable: WIDGET_BUTTON_BORDER_RADIUS_VARIABLE,
    value: WIDGET_BUTTON_DEFAULT_BORDER_RADIUS,
    unit: STYLE_UNIT_PIXEL
  },
  [WIDGET_BUTTON_STYLE_FONT_FAMILY_KEY]: {
    variable: WIDGET_BUTTON_FONT_FAMILY_VARIABLE,
    value: WIDGET_BUTTON_DEFAULT_FONT_FAMILY
  },
  [WIDGET_BUTTON_STYLE_PADDING_KEY]: {
    isComposedStyle: true,
    horizontal: {
      variable: WIDGET_BUTTON_HORIZONTAL_PADDING_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_HORIZONTAL_PADDING,
      unit: STYLE_UNIT_PIXEL
    },
    vertical: {
      variable: WIDGET_BUTTON_VERTICAL_PADDING_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_VERTICAL_PADDING,
      unit: STYLE_UNIT_PIXEL
    }
  },
  [WIDGET_BUTTON_STYLE_TEXT_COLOR_KEY]: {
    isComposedStyle: true,
    hover: {
      variable: WIDGET_BUTTON_HOVER_COLOR_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_HOVER_COLOR
    },
    normal: {
      variable: WIDGET_BUTTON_NORMAL_COLOR_VARIABLE,
      value: WIDGET_BUTTON_DEFAULT_NORMAL_COLOR
    }
  }
}

const WIDGET_BUTTON = {
  styles: WIDGET_BUTTON_STYLES,
  contents: WIDGET_BUTTON_CONTENTS
};

const getConvertedButton = (button = null) => {
  const data = JSON.parse(JSON.stringify(WIDGET_BUTTON));

  if (!button) return data;

  const { contents, styles } = data;
  const parsedButton = JSON.parse(button);
  const parsedButtonKeys = Object.keys(parsedButton);

  for (const key of parsedButtonKeys) {
    if (typeof parsedButton[key] !== 'undefined') {
      const isContentsKey = WIDGET_BUTTON_CONTENT_KEYS.includes(key);
      const isStyleKey = WIDGET_BUTTON_CONTENT_STYLE_KEYS.includes(key);

      if (isContentsKey) {
        contents[key] = parsedButton[key];
      } else if (isStyleKey) {
        const { isComposedStyle } = styles[key];

        if (isComposedStyle) {
          const filledChildKeys = Object.keys(styles[key])
            .filter(childKey => typeof parsedButton[key][childKey] !== 'undefined');

          for (const childKey of filledChildKeys) styles[key][childKey].value = parsedButton[key][childKey];
        } else {
          styles[key].value = parsedButton[key];
        }
      }
    }
  }

  return data;
}

const getCustomizableStyleClasses = () => {
  return `
    .cly-widget-button {
      border-radius: var(${WIDGET_BUTTON_BORDER_RADIUS_VARIABLE});
      font-family: var(${WIDGET_BUTTON_FONT_FAMILY_VARIABLE});
      background: var(${WIDGET_BUTTON_NORMAL_BACKGROUND_VARIABLE});
      padding: var(${WIDGET_BUTTON_VERTICAL_PADDING_VARIABLE}) var(${WIDGET_BUTTON_HORIZONTAL_PADDING_VARIABLE});
      color: var(${WIDGET_BUTTON_NORMAL_COLOR_VARIABLE});
    }

    .cly-widget-button:hover {
      background: var(${WIDGET_BUTTON_HOVER_BACKGROUND_VARIABLE});
      color: var(${WIDGET_BUTTON_HOVER_COLOR_VARIABLE});
    }
  `;
}

const getCustomizableStyleVariables = (buttonStyles = {}) => {
  const finalStyles = {};

  if (!Object.keys(buttonStyles).length) return finalStyles;
  const defaultButtonStyleKeys = Object.keys(WIDGET_BUTTON_STYLES);

  for (const key of defaultButtonStyleKeys) {
    const { isComposedStyle } = buttonStyles[key];

    if (isComposedStyle) {
      const childStyleKeys = Object.keys(buttonStyles[key]);

      for (const childStyleKey of childStyleKeys) {
        const { value, variable, unit = '' } = buttonStyles[key][childStyleKey];

        finalStyles[variable] = `${value}${unit}`;
      }
    } else {
      const { value, variable, unit = '' } = buttonStyles[key];

      finalStyles[variable] = `${value}${unit}`;
    }
  }

  return finalStyles;
}

export default {
  WIDGET_BUTTON_DEFAULT_TEXT,
  WIDGET_BUTTON,
  WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE,
  WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK,
  WIDGET_BUTTON_ACTION_TYPES,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE_VALUE,
  getConvertedButton,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
};

export {
  WIDGET_BUTTON_DEFAULT_TEXT,
  WIDGET_BUTTON,
  WIDGET_BUTTON_ACTION_TYPE_ANOTHER_SCREEN,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE,
  WIDGET_BUTTON_ACTION_TYPE_URL_OR_DEEP_LINK,
  WIDGET_BUTTON_ACTION_TYPES,
  WIDGET_BUTTON_ACTION_TYPE_CLOSE_VALUE,
  getConvertedButton,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
};
