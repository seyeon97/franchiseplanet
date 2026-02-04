'use client'

/**
 * AppLayout Component
 *
 * This is the main app layout for pages in the (app) route group.
 * User initialization is handled in the root layout.
 *
 * TODO: Add your app layout components here:
 * - Header/Navigation
 * - Sidebar
 * - Footer
 * - Any common UI elements for main app pages
 *
 * Example:
 * export function AppLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <div>
 *       <Header />
 *       <main>{children}</main>
 *       <Footer />
 *     </div>
 *   )
 * }
 */
export function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
