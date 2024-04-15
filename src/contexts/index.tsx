'use client';

import { ReactElement, FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactElement;
};

const queryClient = new QueryClient();

const Provider: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default Provider;
