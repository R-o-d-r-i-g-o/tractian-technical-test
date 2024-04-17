'use client';

import { ReactElement, lazy, FC, Suspense } from 'react';

import { ToastContainer } from 'react-toastify';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

// TODO: if a day this app gonna be released, remove it degub pieces from production build.

// Note: let only "ReactQueryDevtools" component that works in "development" environment only.

const Provider: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    {children}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <Suspense>
      <ReactQueryDevtoolsProduction />
    </Suspense>
  </QueryClientProvider>
);

export default Provider;
