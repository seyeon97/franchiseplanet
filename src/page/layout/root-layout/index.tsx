import { RootLayoutClient } from './client'
import { getMe } from '@/api/user'

/**
 * RootLayout Component (Server Component)
 *
 * Root layout for the entire application.
 * Handles server-side user session fetching and passes to client.
 *
 * This is imported in src/app/layout.tsx
 */
export async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getMe()

  return (
    <RootLayoutClient user={user}>
      {children}
    </RootLayoutClient>
  )
}
