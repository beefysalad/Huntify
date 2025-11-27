"use client";

import { ReactNode, useState } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

export default function QueryClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [client] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydrate(client)}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
