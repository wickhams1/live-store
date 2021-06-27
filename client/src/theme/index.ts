import colours from './colours';
import space from './space';
import size from './size';

const theme = {
  colours,
  space,
  size,
};

export type Theme = typeof theme;

export default theme;
