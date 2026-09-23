import { composers } from '../../data/composers'

export async function generateStaticParams() {
  return composers.map(c => ({ slug: c.id }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const { default: ComposerDetail } = await import('./ComposerDetail')
  return <ComposerDetail params={{ slug }} />
}
