import { QueryProvider } from '@/shared/libs/query/provider';
import { PropsWithChildren } from 'react';
import FCMProvider from './FCMProvider';

export const AppProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <QueryProvider>
        <FCMProvider>{children}</FCMProvider>
      </QueryProvider>
    </>
  );
};
