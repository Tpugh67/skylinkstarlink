import type { Metadata } from 'next'
import ManagedClient from './ManagedClient'

export const metadata: Metadata = {
  title: '$0 Upfront Website | SkyLinkStarLink',
  description:
    'We build it. We host it. We maintain it. We keep it running. You focus on your business. Starting at $99/month with $0 upfront.',
}

export default function ManagedPage() {
  return <ManagedClient />
}
