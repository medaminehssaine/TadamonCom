/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const COLORS = {
  // Base Colors
  powderBlue: '#B8D3E1',
  limeYellow: '#D9E872',
  
  // Gradient Combinations
  primaryGradient: ['#B8D3E1', '#D9E872'],
  reverseGradient: ['#D9E872', '#B8D3E1'],
  
  // UI Colors
  background: '#FFFFFF',
  text: '#2A4B5C',
  textLight: '#5A7B8C',
  cardBg: 'rgba(184, 211, 225, 0.1)',
};
