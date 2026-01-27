'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="rounded-2xl bg-[#123c35] text-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#0f2b2a] transition-colors rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-semibold text-brand-sky pr-8">
          {question}
        </span>
        <svg
          className={cn(
            'w-5 h-5 text-brand-emerald transition-transform duration-200 flex-shrink-0'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            className={cn('transition-opacity', isOpen && 'opacity-0')}
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
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-5 text-brand-sky/80 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

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
  const [openItems, setOpenItems] = useState<string[]>([])

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(id) ? [] : [id]
      )
    }
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  )
}
