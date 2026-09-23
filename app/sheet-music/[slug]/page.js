import catalog from '../../../public/data/core-composers-works.json'

export function generateStaticParams() {
  return (catalog.composers || []).map(c => ({ slug: c.slug }))
}

export default async function Page() {
  const { default: SheetMusicClient } = await import('./SheetMusicClient')
  return <SheetMusicClient />
}
