import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

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
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'I’ve been fortunate to speak at conferences around the world',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I love to share ideas and speak at conferences."
      intro="I'm a firm believer that fantastic ideas and learning comes from knowledge-sharing and conversations at events and conferences, so here is a (fairly) complete list of conferences, podcasts, and other speaking opportunities I've had in the realm of Kubernetes and cloud-native."
    >
      <div className="space-y-20">
        <SpeakingSection title="Conferences">
          <Appearance
            href="#"
            title="In space, no one can watch you stream — until now"
            description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
            event="SysConf 2021"
            cta="Watch video"
          />
          <Appearance
            href="#"
            title="Lessons learned from our first product recall"
            description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
            event="Business of Startups 2020"
            cta="Watch video"
          />
        </SpeakingSection>
        <SpeakingSection title="Podcasts">
          <Appearance
            href="https://www.kubernetesbytes.com/home-1/episode/44410748/mongodb-kubernetes-operators-with-joel-lord-and-cedric-clyburn"
            title="MongoDB Kubernetes Operators with Joel Lord & Cedric Clyburn"
            description="Hosts of Kubernetes Bytes, Bhavin and Ryan, dive into the different operators MongoDB has for deploying and managing MongoDB with Kubernetes."
            event="Kubernetes Bytes, August 2022"
            cta="Listen to podcast"
          />
          <Appearance
            href="https://podcasts.mongodb.com/public/112/The-MongoDB-Podcast-b02cf624/343850c6"
            title="The Intern Episode, Part 2"
            description="Cedric speaks with interns, and the early talent program manager, about the MongoDB summer internship experience."
            event="The MongoDB Podcast, July 2022"
            cta="Listen to podcast"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
