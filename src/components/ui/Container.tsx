import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'small' | 'large'
}

export default function Container({
  children,
  className,
  size = 'default'
}: ContainerProps) {
  const sizeClasses = {
    small: 'max-w-4xl',
    default: 'max-w-7xl',
    large: 'max-w-[1400px]',
  }

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8 w-full',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}
