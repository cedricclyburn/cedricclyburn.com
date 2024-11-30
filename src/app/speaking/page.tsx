import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

async function fetchEvents() {
  const response = await fetch('https://sessionize.com/api/speaker/json/y57j9luise', {
    next: { revalidate: 60 }, // Optional: Revalidate every 60 seconds for fresh data
  })
  const data = await response.json()
  return data.events
}

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  location,
  date,
  cta,
  href,
}: {
  title: string
  location?: string
  date?: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Eyebrow decorate>
        {location && date ? `${location} | ${date}` : location || date}
      </Card.Eyebrow>
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Speaking',
  description: "Cedric Clyburn's speaking engagements at conferences and more",
}

export default async function Speaking() {
  const events = await fetchEvents()

  return (
    <SimpleLayout
      title="I love to share ideas and speak at conferences."
      intro="I'm a firm believer that fantastic ideas and learning come from knowledge-sharing and conversations at events and conferences, so here is a (fairly) complete list of conferences, podcasts, and other speaking opportunities I've had in the realm of Kubernetes and cloud-native."
    >
      <div className="space-y-20">
        {/* Conferences Section */}
        <SpeakingSection title="Conferences">
          {events.map((event: any) => (
            <Appearance
              key={event.id}
              href={event.website}
              title={event.name}
              location={event.location}
              date={new Date(event.eventStartDate).toLocaleDateString()}
              cta="Learn more"
            />
          ))}
        </SpeakingSection>

        {/* Podcasts Section */}
        <SpeakingSection title="Podcasts">
          <Appearance
            href="https://www.kubernetesbytes.com/home-1/episode/44410748/mongodb-kubernetes-operators-with-joel-lord-and-cedric-clyburn"
            title="MongoDB Kubernetes Operators with Joel Lord & Cedric Clyburn"
            location="Kubernetes Bytes, August 2022"
            cta="Listen to podcast"
          />
          <Appearance
            href="https://podcasts.mongodb.com/public/112/The-MongoDB-Podcast-b02cf624/343850c6"
            title="The Intern Episode, Part 2"
            location="The MongoDB Podcast, July 2022"
            cta="Listen to podcast"
          />
        </SpeakingSection>
      </div>
      <Analytics />
    </SimpleLayout>
  )
}
