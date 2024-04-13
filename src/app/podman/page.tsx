import { type Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoRedhatdeveloper from '@/images/logos/redhatdeveloper.svg'
import logoYoutube from '@/images/logos/youtube.png'
import logoPodman from '@/images/logos/podman.png'
import logoGithub from '@/images/logos/github.png'
import logoBlog from '@/images/logos/blog.png'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoRedhat from '@/images/logos/redhat.svg'

const projects = [
  {
    name: 'Podman + Podman Desktop Slides',
    description:
      'View the slides from the talk in Google Slides.',
    link: { href: 'https://red.ht/podman-desktop-slides', label: 'docs.google.com' },
    logo: logoPodman,
  },
  {
    name: 'Demo Script Repository',
    description:
      'Check out the repository containing the demo used today, plus examples for Compose, Minikube, WASM, & more!',
    link: { href: 'https://github.com/redhat-developer/podman-desktop-demo', label: 'github.com' },
    logo: logoGithub,
  },
  {
    name: 'Podman Desktop Guide',
    description:
      'Tutorial for setting up & using Podman Desktop, with the demo from today! [Work in progress]',
    link: { href: 'https://redhat-scholars.github.io/podman-desktop-tutorial', label: 'github.io' },
    logo: logoRedhatdeveloper,
  },
  {
    name: 'Podman vs Docker: Whiteboard Video Explainer',
    description:
      'Interested in learning the difference between these container management tools? Check out this whiteboard explainer.',
    link: { href: 'https://www.youtube.com/watch?v=Xx588nbshlM', label: 'youtube.com' },
    logo: logoYoutube,
  },
  {
    name: 'Podman Desktop for Java Development',
    description:
      'Learn how to setup Podman Desktop to start working with Java specific development.',
    link: { href: 'https://www.thomasvitale.com/podman-desktop-for-java-development/', label: 'thomasvitale.com' },
    logo: logoBlog,
  },
  {
    name: 'Managing Java containers with Quarkus and Podman Desktop',
    description:
      'Check out this guide for how to create and manage Quarkus containers with Podman Desktop.',
    link: { href: 'https://developers.redhat.com/articles/2023/07/03/managing-java-containers-quarkus-and-podman-desktop', label: 'developers.redhat.com' },
    logo: logoRedhatdeveloper,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Podman + Podman Desktop resources',
  description: 'Tutorials, videos, and blogs on all things around Podman, Podman Desktop, and more.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Podman + Podman Desktop resources and more!"
      intro="Here's all of my favorite resources (tutorials, videos, and blogs) on all things around Podman, Podman Desktop, and more. Thanks for coming to my talk!"
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
      <Analytics />
    </SimpleLayout>
    
  )
}
