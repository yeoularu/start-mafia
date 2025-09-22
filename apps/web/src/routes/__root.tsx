import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { createORPCClient } from '@orpc/client'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AppRouterClient } from '../../../server/src/routers'
import type { orpc } from '@/utils/orpc'
import type { QueryClient } from '@tanstack/react-query'
import { link } from '@/utils/orpc'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import Loader from '@/components/loader'
import '../index.css'

export interface RouterAppContext {
  orpc: typeof orpc
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Start Mafia',
      },
      {
        name: 'description',
        content: "Let's Start the Mafia Game!",
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
})

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  })

  const [client] = useState<AppRouterClient>(() => createORPCClient(link))
  const [orpcUtils] = useState(() => createTanstackQueryUtils(client))

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className="grid h-svh grid-rows-[auto_1fr]">
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster richColors />
      </ThemeProvider>

      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  )
}
