'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {siteConfig.navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-brand-emerald text-white'
                : 'text-brand-navy hover:bg-brand-sky hover:text-brand-emerald'
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
