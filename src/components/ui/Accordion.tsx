import { cn } from '@/lib/utils'

interface AccordionProps {
  items: Array<{
    id: string
    question: string
    answer: string
  }>
  allowMultiple?: boolean
  className?: string
}

export default function Accordion({
  items,
  allowMultiple = false,
  className
}: AccordionProps) {
  const groupName = allowMultiple ? undefined : 'accordion-resolvver'

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => (
        <details
          key={item.id}
          name={groupName}
          className="group rounded-2xl bg-brand-navy text-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-6 py-4 text-left transition-colors hover:bg-brand-navy/90">
            <span className="pr-8 text-base font-semibold text-brand-sky md:text-lg">
              {item.question}
            </span>

            <svg
              className="h-5 w-5 flex-shrink-0 text-brand-emerald"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className="transition-opacity group-open:opacity-0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14"
              />
            </svg>
          </summary>

          <div className="px-6 pb-5 leading-relaxed text-brand-sky/80">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
