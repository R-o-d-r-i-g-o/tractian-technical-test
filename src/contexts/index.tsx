'use client';

import { ReactElement, FC } from 'react';

import { ToastContainer } from 'react-toastify';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactElement;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 4000,
      staleTime: 60 * 60,
    },
  },
});

// TODO: if a day this app gonna be released, remove it degub pieces from production build.
// Note: to do that use "NODE_ENV" environment variable.

const Provider: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default Provider;
