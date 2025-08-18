import localFont from 'next/font/local';

export const libertinus = localFont({
  src: [
    { path: './LibertinusSerif/LibertinusSerif-Regular.ttf', weight: '400', style: 'normal' },
    { path: './LibertinusSerif/LibertinusSerif-Bold.ttf', weight: '700', style: 'normal' },
    { path: './LibertinusSerif/LibertinusSerif-Italic.ttf', weight: '400', style: 'italic' },
    { path: './LibertinusSerif/LibertinusSerif-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  display: 'swap',
});