'use client'
import { useState, useEffect } from 'react'

export default function UICheck() {
  const [isDark, setIsDark] = useState(false)

  // Apply theme to <html> element whenever isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <main className="my_container flex-col gap-6">
    <div className='max-w-5xl flex flex-col items-start gap-4'>
      <h1 className="text-8xl text-theme-purple">
        Purple heading (changes with theme)
      </h1>

      <p className="text-theme-purple">
        This text uses <code>text-purple</code> from @theme — light/dark friendly.
      </p>

      <div className="p-4 rounded-md bg-theme-purple">
        Background with purple at 10% opacity
      </div>

      <button
        onClick={() => setIsDark(prev => !prev)}
        className="px-4 py-2 rounded-md border mt-6"
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
      </div>
    </main>
  )
}
