import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'

// Server wrapper so MDX never touches the next/image client export.
// The dev JSX runtime reads Component.propTypes, which throws on that export.
function MdxImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />
}

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: MdxImage,
  }
}
