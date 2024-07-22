import { STYLE_UNIT_PIXEL } from './global';
import { WIDGET_BUTTON } from './button';

const WIDGET_BUTTON_DEFAULT_GROUP_SPACE_BETWEEN = 8;

const WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VARIABLE = '--align-items';
const WIDGET_BUTTON_GROUP_GAP_VARIABLE = '--buttons-gap';
const WIDGET_BUTTON_GROUP_DIRECTION_VARIABLE = '--flex-direction';

const WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VALUE_CENTER = 'center';
const WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VALUE_STRETCH = 'stretch';
const WIDGET_BUTTON_GROUP_DIRECTION_VALUE_COLUMN = 'column';
const WIDGET_BUTTON_GROUP_DIRECTION_VALUE_ROW = 'row';

const WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH = 'full-width';
const WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE = 'side-by-side';
const WIDGET_BUTTON_GROUP_POSITIONS = [
  WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH,
  WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE
];

const WIDGET_BUTTON_GROUP_CONTENT_BUTTONS_KEY = 'buttons';

const WIDGET_BUTTON_GROUP_CONTENT_KEYS = [
  WIDGET_BUTTON_GROUP_CONTENT_BUTTONS_KEY
]

const WIDGET_BUTTON_GROUP_STYLE_POSITION_KEY = 'position';
const WIDGET_BUTTON_GROUP_STYLE_SPACE_BETWEEN_KEY = 'spaceBetween';

const WIDGET_BUTTON_GROUP_STYLE_KEYS = [
  WIDGET_BUTTON_GROUP_STYLE_POSITION_KEY,
  WIDGET_BUTTON_GROUP_STYLE_SPACE_BETWEEN_KEY
]

const WIDGET_BUTTON_GROUP_CUSTOM_STYLE_VALUE_BY_STYLE_KEY = {
  [WIDGET_BUTTON_GROUP_STYLE_POSITION_KEY]: {
    [WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH]: {
      [WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VARIABLE]: WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VALUE_STRETCH,
      [WIDGET_BUTTON_GROUP_DIRECTION_VARIABLE]: WIDGET_BUTTON_GROUP_DIRECTION_VALUE_COLUMN
    },
    [WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE]: {
      [WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VARIABLE]: WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VALUE_CENTER,
      [WIDGET_BUTTON_GROUP_DIRECTION_VARIABLE]: WIDGET_BUTTON_GROUP_DIRECTION_VALUE_ROW
    }
  }
};

const WIDGET_BUTTON_GROUP_CONTENTS = {
  [WIDGET_BUTTON_GROUP_CONTENT_BUTTONS_KEY]: [WIDGET_BUTTON, WIDGET_BUTTON]
};

const WIDGET_BUTTON_GROUP_STYLES = {
  [WIDGET_BUTTON_GROUP_STYLE_POSITION_KEY]: {
    isCustomValueStyle: true,
    value: WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE
  },
  [WIDGET_BUTTON_GROUP_STYLE_SPACE_BETWEEN_KEY]: {
    variable: WIDGET_BUTTON_GROUP_GAP_VARIABLE,
    value: WIDGET_BUTTON_DEFAULT_GROUP_SPACE_BETWEEN,
    unit: STYLE_UNIT_PIXEL
  }
}

const WIDGET_BUTTON_GROUP = {
  contents: WIDGET_BUTTON_GROUP_CONTENTS,
  styles: WIDGET_BUTTON_GROUP_STYLES
};


const getConvertedButtonGroup = (buttonGroup = null) => {
  const data = JSON.parse(JSON.stringify(WIDGET_BUTTON_GROUP));

  if (!buttonGroup) return data;

  const { contents, styles } = data;
  const parsedButtonGroup = JSON.parse(buttonGroup);
  const parsedButtonGroupKeys = Object.keys(parsedButtonGroup);

  for (const key of parsedButtonGroupKeys) {
    if (typeof parsedButtonGroup[key] !== 'undefined') {
      const isContentKey = WIDGET_BUTTON_GROUP_CONTENT_KEYS.includes(key);
      const isStyleKey = WIDGET_BUTTON_GROUP_STYLE_KEYS.includes(key);

      if (isContentKey) contents[key] = parsedButtonGroup[key];
      else if (isStyleKey) styles[key].value = parsedButtonGroup[key];
    }
  }

  return data;
};

const getCustomizableStyleClasses = () => {
  return `
    * {
      ${WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VARIABLE}: ${WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VALUE_CENTER};
      ${WIDGET_BUTTON_GROUP_GAP_VARIABLE}: ${WIDGET_BUTTON_DEFAULT_GROUP_SPACE_BETWEEN}${STYLE_UNIT_PIXEL};
      ${WIDGET_BUTTON_GROUP_DIRECTION_VARIABLE}: ${WIDGET_BUTTON_GROUP_DIRECTION_VALUE_ROW};
    }

    .cly-widget-button-group {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: var(${WIDGET_BUTTON_GROUP_ALIGN_ITEMS_VARIABLE});
      flex-direction: var(${WIDGET_BUTTON_GROUP_DIRECTION_VARIABLE});
      gap: var(${WIDGET_BUTTON_GROUP_GAP_VARIABLE});
    }
  `
};

const getCustomizableStyleVariables = (buttonGroupStyles = {}) => {
  const finalStyles = {};

  if (!Object.keys(buttonGroupStyles).length) return finalStyles;

  for (const key of WIDGET_BUTTON_GROUP_STYLE_KEYS) {
    const { isCustomValueStyle } = buttonGroupStyles[key] || {};

    if (isCustomValueStyle) {
      const { value: customStyleValueKey } = buttonGroupStyles[key] || {};
      const styleCustomValue = WIDGET_BUTTON_GROUP_CUSTOM_STYLE_VALUE_BY_STYLE_KEY[key][customStyleValueKey];
      const styleCustomValueKeys = Object.keys(styleCustomValue);

      for (const styleCustomValueKey of styleCustomValueKeys) {
        finalStyles[styleCustomValueKey] = styleCustomValue[styleCustomValueKey];
      }
    } else {
      const { value, variable, unit = '' } = buttonGroupStyles[key] || {};

      finalStyles[variable] = `${value}${unit}`;
    }
  }

  return finalStyles;
};

export default {
  WIDGET_BUTTON_GROUP,
  WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH,
  WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE,
  WIDGET_BUTTON_GROUP_POSITIONS,
  getConvertedButtonGroup,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
};

export {
  WIDGET_BUTTON_GROUP,
  WIDGET_BUTTON_GROUP_POSITION_FULL_WIDTH,
  WIDGET_BUTTON_GROUP_POSITION_SIDE_BY_SIDE,
  WIDGET_BUTTON_GROUP_POSITIONS,
  getConvertedButtonGroup,
  getCustomizableStyleClasses,
  getCustomizableStyleVariables
};
