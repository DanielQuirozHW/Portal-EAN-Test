const DefaultPalette = (mode, skin, themeColor) => {
  const whiteColor = '#FFFFFF'
  const blackColor = '#000000'
  const mainColor = mode === 'light' ? '59, 59, 59' : '220, 220, 220' // para textos

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#3bac52'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#3bac52'
    }
  }

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') return whiteColor
    if (skin === 'bordered' && mode === 'dark') return '#1e2d22'
    return mode === 'light' ? '#F5F5F5' : '#1e2d22'
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === 'light' ? '#F5F5F5' : '#0f1a14',
      icono: mode === 'light' ? '#3bac52' : '#8ddc9b',
      trackBg: mode === 'light' ? '#E0E0E0' : '#3bac52',
      avatarBg: mode === 'light' ? '#F0F0F0' : '#2a4731',
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#1a1a1a',
      table: mode === 'light' ? '#E0E0E0' : '#2a4731',
      subtitle: mode === 'light' ? '#3bac52' : '#6ed87e',
      dialogBg: mode === 'light' ? whiteColor : '#1e1e1e'
    },
    mode: mode,
    common: {
      black: blackColor,
      white: whiteColor
    },
    primary: {
      light: '#6ed87e',
      main: '#3bac52',
      dark: '#2b8d3e',
      contrastText: whiteColor
    },
    secondary: {
      light: '#00c0b3',
      main: '#009579',
      dark: '#005e85',
      contrastText: whiteColor
    },
    error: {
      light: '#ff867c',
      main: '#ef5350',
      dark: '#d32f2f',
      contrastText: whiteColor
    },
    warning: {
      light: '#fff176',
      main: '#ffca28',
      dark: '#f57c00',
      contrastText: blackColor
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: whiteColor
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#2a4731',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}


export default DefaultPalette
