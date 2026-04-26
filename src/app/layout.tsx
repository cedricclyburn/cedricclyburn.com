import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cedricclyburn.com'

const description =
  "I'm Cedric, a developer advocate based at Red Hat, with a background in Kubernetes, DevOps, and container tools. I love all things open-source, and create demos, workshops, and content to make developer's lives easier! Based out of New York City."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Cedric Clyburn',
    default:
      'Cedric Clyburn - Developer advocate & engineer for all things cloud-native',
  },
  description,
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    title: 'Cedric Clyburn',
    description,
    url: siteUrl,
    siteName: 'Cedric Clyburn',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cedric Clyburn',
    description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cedric Clyburn',
  url: siteUrl,
  jobTitle: 'Developer Advocate',
  worksFor: {
    '@type': 'Organization',
    name: 'Red Hat',
  },
  sameAs: [
    'https://x.com/cedricclyburn',
    'https://github.com/cedricclyburn',
    'https://www.linkedin.com/in/cedricclyburn',
    'https://www.youtube.com/@cedcodes',
    'https://www.instagram.com/cedricclyburn',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
