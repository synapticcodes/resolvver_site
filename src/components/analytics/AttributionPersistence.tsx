'use client'

import { useEffect } from 'react'
import { persistWolfgangAttribution } from '@/lib/wolfgang-tracking'

export default function AttributionPersistence() {
  useEffect(() => {
    persistWolfgangAttribution()
  }, [])

  return null
}
