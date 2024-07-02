import { colors, createTheme } from '@mui/material';
import { Roboto } from 'next/font/google';

// font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

// theme
const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        fixed: true,
        maxWidth: 'md',
      },
    },
    MuiStack: {
      defaultProps: {
        direction: 'row', // like native flex
      },
    },
  },
  palette: {
    primary: {
      main: colors.blue[400],
      contrastText: 'white',
    },
  },
  spacing: (x: number) => `${x}rem`,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
