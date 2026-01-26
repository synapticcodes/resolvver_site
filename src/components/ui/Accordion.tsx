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
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-brand-sky/30 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-brand-navy pr-8">
          {question}
        </span>
        <svg
          className={cn(
            'w-5 h-5 text-brand-emerald transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-5 text-brand-slate leading-relaxed">
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
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-200', className)}>
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
