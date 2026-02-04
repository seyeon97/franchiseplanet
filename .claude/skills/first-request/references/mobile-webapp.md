# Mobile Web App Layout Reference

For mobile-first web apps — app-like layout with bottom navigation.

## Requirements

### 1. App Container
- Max width limited: `max-w-md`
- Centered on screen
- Height fixed to viewport: `h-dvh`

### 2. Scroll Behavior
- Scroll inside app container (main), NOT body
- Hide scrollbar globally

```css
/* globals.css */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
*::-webkit-scrollbar {
  display: none;
}
```

### 3. Bottom Navigation
- Fixed at bottom
- Icon + label structure
- Current tab highlighted

```tsx
// Example structure
<nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t">
  <div className="flex justify-around py-2">
    {tabs.map((tab) => (
      <Link
        key={tab.href}
        href={tab.href}
        className={cn(
          "flex flex-col items-center gap-1 text-xs",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        <tab.icon className="size-5" />
        <span>{tab.label}</span>
      </Link>
    ))}
  </div>
</nav>
```

### 4. App Bar
- Each page implements own app bar
- Use `sticky top-0` (allows different designs per page)

```tsx
// Example app bar
<header className="sticky top-0 z-10 bg-white border-b px-4 py-3">
  <h1 className="text-lg font-semibold">Page Title</h1>
</header>
```

### 5. Layout Structure

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto max-w-md h-dvh flex flex-col">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
```

### 6. Sample Home Page

Include sample app bar and scroll test content:

```tsx
// src/page/home/index.tsx
export function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Home</h1>
      </header>
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded" />
        ))}
      </div>
    </>
  )
}
```

## Folder Structure

```
src/
  app/
    layout.tsx       # App container + bottom nav
    page.tsx         # Route to home
  page/
    home/
      index.tsx      # Home page with app bar
  lib/
    components/
      bottom-nav.tsx # Bottom navigation component
```
