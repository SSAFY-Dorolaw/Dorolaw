import { QueryProvider } from '@/shared/libs/query/provider';
import { PropsWithChildren } from 'react';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};
