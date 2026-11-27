import { type Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-accent dark:text-zinc-200 dark:hover:text-accent"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-accent" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Cedric Clyburn. Nice to meet you!',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I’m Cedric Clyburn. Nice to meet you!
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400 [&_a]:text-accent dark:[&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 dark:[&_a]:decoration-accent/30 [&_a]:underline-offset-2 [&_a]:transition [&_a:hover]:decoration-accent dark:[&_a:hover]:decoration-accent">
            <p>
              I've always loved the moment when something "clicks," when you
              realize how something works, and there's clarity. During my first
              internship in college, I had the opportunity to become a developer
              advocate, and I was able to make that happen for others while
              spreading awareness of open-source software and culture. Since
              then, I've been devoted to making education more accessible for
              all, working in the open, and helping make developers' lives
              easier!
            </p>
            <p>
              My background has been focused on{' '}
              <a href="https://kubernetes.io/">Kubernetes</a> for application
              deployment, working on projects like{' '}
              <a href="https://podman.io/">Podman</a> for container management
              and <a href="https://docs.vllm.ai/">vLLM</a> for AI inference.
              I've built interactive demos, led workshops around the world, and
              helped developers use open source projects. However, I absolutely{' '}
              <em>love</em> creating video and written content to help
              developers learn new topics in emerging technologies, with over
              3M+ views online.
            </p>
            <p>
              One of my passions is connecting folks, so I help organize the
              annual <a href="https://kcdnewyork.com">Kubernetes Community Days</a>{' '}
              conference in New York City. I also enjoy speaking at conferences
              and have had the privilege to speak at events including Devoxx,
              KubeCon, WeAreDevelopers World Congress, DeveloperWeek, DevNexus,
              DevConf, and many more!
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/cedricclyburn" icon={XIcon}>
              @cedricclyburn
            </SocialLink>
            <SocialLink href="https://www.instagram.com/cedricclyburn" icon={InstagramIcon} className="mt-4">
              @cedricclyburn
            </SocialLink>
            <SocialLink href="https://github.com/cedricclyburn" icon={GitHubIcon} className="mt-4">
              cedricclyburn
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/cedricclyburn" icon={LinkedInIcon} className="mt-4">
              cedricclyburn
            </SocialLink>
            <SocialLink href="https://www.youtube.com/@cedcodes" icon={YoutubeIcon} className="mt-4">
              @cedcodes
            </SocialLink>
            <SocialLink
              href="mailto:cedricclyburn@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              cedricclyburn@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
      <Analytics />
    </Container>
  )
}
