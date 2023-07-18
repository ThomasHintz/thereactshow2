'use client';
import { NProvider } from 'next13-progressbar';

const Providers = ({ children }) => {
  return <NProvider color="#fff">{children}</NProvider>;
};

export default Providers;
