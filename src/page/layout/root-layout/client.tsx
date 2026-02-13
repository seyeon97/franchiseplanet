'use client'

import { StateProvider } from '@/lib/state'
import { Toaster } from '@/lib/components/ui/sonner'
import { useUser, type User } from '@/state/user'
import NavigationBar from '@/lib/navigation-bar'

/**
 * UserInit Component (Internal)
 *
 * Initializes user state from server-side data
 * Uses { silent: true } to prevent re-render on initial load
 */
function UserInit({ user }: { user?: User | null }) {
  const init = useUser(s => s.actions.init)

  /**
   * Initialize user state from server
   * DO NOT wrap in useEffect - needs to run during render for SSR
   */
  init(user)

  return null
}

/**
 * RootLayoutClient Component
 *
 * Client-side root layout that handles:
 * - Global state initialization (StateProvider)
 * - User state hydration from server (UserInit)
 *
 * This component receives user data from the server component
 * and initializes the client-side state.
 */
export function RootLayoutClient({
  user,
  children
}: {
  user?: User | null
  children: React.ReactNode
}) {
  return (
    <StateProvider>
      <UserInit user={user} />
      {children}
      <NavigationBar />
      <Toaster />
    </StateProvider>
  )
}
