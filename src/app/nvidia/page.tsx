import { type Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import Image, { type StaticImageData } from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import howAiInferenceWorks from '@/images/nvidia/how-ai-inference-works.png'
import courseBanner from '@/images/nvidia/course-banner.png'
import llmQuantization from '@/images/nvidia/llm-quantization.png'
import societeGeneraleTownHall from '@/images/nvidia/societe-generale-town-hall.png'
import essentialSkills from '@/images/nvidia/essential-skills.png'
import gettingStartedLlmD from '@/images/nvidia/getting-started-llm-d.png'
import introductionToLlmD from '@/images/nvidia/introduction-to-llm-d.jpg'

type Resource = {
  title: string
  description: string
  href?: string
  image?: StaticImageData
  fit?: 'contain'
  priority?: boolean
}

const sections: Array<{ id: string; title: string; items: Resource[] }> = [
  {
    id: 'community',
    title: 'Community',
    items: [
      {
        title: 'How AI inference works',
        description:
          'An Explained article on how inference and the KV cache actually work.',
        href: 'https://x.com/cedricclyburn/status/2082105486804127885',
        image: howAiInferenceWorks,
        priority: true,
      },
      {
        title: 'vLLM vs. SGLang',
        description:
          'A benchmarked comparison of the two engines, and when each one fits.',
        href: 'https://developers.redhat.com/articles/2026/10/14/vllm-vs-sglang-choosing-the-right-inference-engine-for-your-workload',
      },
      {
        title: 'Fast & Efficient LLM Inference with vLLM',
        description:
          'Hands-on course: compress a model, serve it with vLLM, then benchmark it.',
        href: 'https://www.deeplearning.ai/courses/fast-and-efficient-llm-inference-with-vllm',
        image: courseBanner,
      },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    items: [
      {
        title: 'GPU-as-a-Service with Kueue and MIG',
        description:
          'How a platform team shares NVIDIA GPUs, sliced with MIG and queued with Kueue.',
        href: 'https://developers.redhat.com/articles/2026/06/29/implement-gpu-as-a-service-kueue',
      },
      {
        title: 'LLM quantization guide',
        description:
          'What quantization changes, and what it does to GPU count and cost.',
        href: 'https://developers.redhat.com/articles/2026/09/02/llm-quantization-guide-how-to-do-it--and-how-it-helps',
        image: llmQuantization,
        fit: 'contain',
      },
      {
        title: 'Société Générale town hall',
        description:
          'A CTO-style session at Société Générale’s Les Dunes auditorium.',
        image: societeGeneraleTownHall,
      },
    ],
  },
  {
    id: 'developer-engagement',
    title: 'Developer engagement',
    items: [
      {
        title: 'Essential skills for an AI engineer',
        description:
          'A whiteboard on the skills behind RAG, agents, and inference.',
        href: 'https://www.youtube.com/watch?v=XN3xNJvWXsc',
        image: essentialSkills,
      },
      {
        title: 'Getting started with llm-d',
        description:
          'A hands-on look at llm-d routing on KV cache and splitting prefill from decode.',
        href: 'https://developers.redhat.com/articles/2025/08/19/getting-started-llm-d-distributed-ai-inference',
        image: gettingStartedLlmD,
        fit: 'contain',
      },
      {
        title: 'Introduction to llm-d',
        description:
          'A podcast on why a normal Kubernetes load balancer mishandles LLM traffic.',
        href: 'https://www.youtube.com/watch?v=2Wtug1kTwUk',
        image: introductionToLlmD,
      },
    ],
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

function hostLabel(href: string) {
  return new URL(href).hostname.replace(/^www\./, '')
}

function ResourceCard({ item }: { item: Resource }) {
  return (
    <Card as="li">
      <div className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            sizes="(min-width: 640px) 24rem, 100vw"
            priority={item.priority}
            className={
              item.fit === 'contain'
                ? 'absolute inset-0 h-full w-full object-contain'
                : 'absolute inset-0 h-full w-full object-cover object-top'
            }
          />
        ) : null}
      </div>
      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {item.href ? (
          <Card.Link href={item.href} target="_blank" rel="noopener noreferrer">
            {item.title}
          </Card.Link>
        ) : (
          item.title
        )}
      </h2>
      <Card.Description>{item.description}</Card.Description>
      {item.href ? (
        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
          <LinkIcon className="h-6 w-6 flex-none" />
          <span className="ml-2">{hostLabel(item.href)}</span>
        </p>
      ) : null}
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'AI inference',
  description:
    'A short set of guides, a course, and talks on vLLM, llm-d, and running GPUs on Kubernetes.',
}

export default function NvidiaPage() {
  return (
    <SimpleLayout
      title="Work on AI inference."
      intro="A short set of guides, a course, and talks on vLLM, llm-d, and running GPUs on Kubernetes."
    >
      {sections.map((section, index) => (
        <section
          key={section.id}
          aria-labelledby={section.id}
          className={
            index === 0
              ? undefined
              : 'mt-16 border-t border-zinc-100 pt-16 sm:mt-20 sm:pt-20 dark:border-zinc-700/40'
          }
        >
          <h2
            id={section.id}
            className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
          >
            {section.title}
          </h2>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2"
          >
            {section.items.map((item) => (
              <ResourceCard key={item.title} item={item} />
            ))}
          </ul>
        </section>
      ))}
      <Analytics />
    </SimpleLayout>
  )
}
