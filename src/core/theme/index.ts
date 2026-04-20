import { moderateScale, fontScale } from './responsive';

export const theme = {
  colors: {
    background: '#030303', // Deep Reddit Dark
    surface: '#1A1A1B', // Card/Input background
    primary: '#FF4500', // The iconic Reddit Orange
    textPrimary: '#D7DADC', // Off-white for readability
    textSecondary: '#818384',
    border: '#343536',
    error: '#FF0000',
  },
  spacing: {
    xs: moderateScale(4),
    s: moderateScale(8),
    m: moderateScale(16),
    l: moderateScale(24),
    xl: moderateScale(32),
    xxl: moderateScale(48),
  },
  typography: {
    // Headings (For Screen Titles)
    h1: { fontFamily: 'RedditSans-Bold', fontSize: fontScale(32) },
    h2: { fontFamily: 'RedditSans-Bold', fontSize: fontScale(24) },
    h3: { fontFamily: 'RedditSans-SemiBold', fontSize: fontScale(20) },

    // Body Text (For Feed, Comments)
    bodyLarge: { fontFamily: 'RedditSans-Regular', fontSize: fontScale(16) },
    bodyMedium: { fontFamily: 'RedditSans-Regular', fontSize: fontScale(14) },

    // Interactive (For Buttons, Tabs)
    button: {
      fontFamily: 'RedditSans-SemiBold',
      fontSize: fontScale(16),
      textTransform: 'uppercase' as const,
    },

    // Subtext (For Timestamps, small info)
    caption: { fontFamily: 'RedditSans-Medium', fontSize: fontScale(12) },
    overline: {
      fontFamily: 'RedditSans-Bold',
      fontSize: fontScale(10),
      textTransform: 'uppercase' as const,
    },
  },
  borderRadius: {
    small: moderateScale(4),
    medium: moderateScale(8),
    round: moderateScale(50), // For full rounded buttons
  },
};
