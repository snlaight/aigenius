/* eslint-disable react/jsx-props-no-spreading */

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemeProvider {...props}>
    {children}
  </NextThemeProvider>
);

export default ThemeProvider;
