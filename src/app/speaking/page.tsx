import { type Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"

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
            href="https://docs.google.com/presentation/d/1Owg4LZ3b99Ptxu_bb-zRYqO882DOaHstUDLJZIiTYys/edit"
            title="Simplifying containers and Kubernetes on your laptop with Podman Desktop"
            description="Supercharge your container application development workflow, and easily craft your applications for Kubernetes with Podman Desktop, an open-source container management tool to seamlessly run, debug, and manage containers and Kubernetes from your local environment."
            event="DeveloperWeek"
            cta="View presentation"
          />
          <Appearance
            href="https://www.youtube.com/watch?v=VAM-FSz0oPg"
            title="Empowering Collaboration: AI Developer Experience - Your Bridge from Model to Production"
            description="A technical deep-dive into the process data scientists and developers can follow for end-to-end generative AI application development on Kubernetes, using open source technologies like Jupyter, Kubeflow, and KServe Model Mesh."
            event="The Linux Foundation: AI.dev"
            cta="Watch video"
          />
          <Appearance
            href="https://www.youtube.com/watch?v=Q8a4XHXraz4"
            title="Reducing Developer Cognitive Load with Red Hat Enterprise Linux"
            description="Red Hat Enterprise Linux (RHEL) offers a large toolset for modern software projects that can help reduce developer cognitive load. Let's explore the open source tools and runtimes that make this possible, including porting a .NET application from Windows to Linux & more."
            event="We Are Developers World Congress"
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
