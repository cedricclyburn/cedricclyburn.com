import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
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
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
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
    'I’m Cedric Clyburn. I love teaching about all things cloud-native.',
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
          I’m Cedric Clyburn. I love teaching about all things cloud-native.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p> 
              I've always loved the moment when something "<em>clicks</em>", 
              where you realize how something works, and there's clarity. 
              When I had the opportunity during my first internship in college 
              to become a <a href="https://www.whatisdevrel.com/">developer advocate</a>
              , I was able to make that happen for others, all 
              while spreading the awareness of open source 
              software and culture. Since then, I've been devoted to making 
              education more accessible for all, to work in the open, and try 
              and help make developers lives easier! 
            </p> 
            <p> 
              Fortunately, I have been around for a time 
              where <a href="https://kubernetes.io/">Kubernetes</a> has been the 
              standard for application deployment, and much of my work has 
              revolved around the container tools <a href="https://podman.io/">Podman</a>
              , <a href="https://podman-desktop.io/">Podman Desktop</a>
              , <a href="https://buildah.io/">Buildah</a>, and related projects. 
              In the realm of inner loop development, I help promote 
              the <a href="https://odo.dev/">odo CLI</a> as well as 
              the <a href="https://github.com/redhat-developer/openshift-toolkit">OpenShift Toolkit</a> 
              for deploying to Kubernetes clusters. Additionally, I've created 
              workshops for cloud-native CI/CD with <a href="https://tekton.dev/">Tekton</a>, 
              and dabble with AI and MLOps. 
            </p>
            <p>
            One of my passions is connecting folks, so I help to organize the 
            annual <a href="https://kubernetescommunitydays.org/events/2023-nyc/">
            Kubernetes Community Days conference in New York City</a>. 
            I also enjoy speaking myself at conferences, and have had the privilege 
            to speak at a number of events, including The Linux 
            Foundation's <a href="https://events.linuxfoundation.org/ai-dev-north-america/">AI.dev</a>
            , <a href="https://www.wearedevelopers.com/world-congress/">WeAreDevelopers World Congress</a>
            , <a href="https://www.developerweek.com/">DeveloperWeek</a>
            , <a href="https://devnexus.com/">DevNexus</a>
            , <a href="https://www.devconf.info/">DevConf</a>
            , and many more!
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/cedricclyburn" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://www.instagram.com/cedricclyburn" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://github.com/cedricclyburn" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/cedricclyburn" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
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
    </Container>
  )
}
