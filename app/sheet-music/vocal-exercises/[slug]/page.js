import Link from 'next/link'
import SiteHeader from '../../../../components/SiteHeader'
import vocalData from '../../../../public/data/vocal-exercises.json'

export function generateStaticParams() {
  return (vocalData.collections || []).map(c => ({ slug: c.id }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const collection = (vocalData.collections || []).find(x => x.id === slug)

  if (!collection) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-5 text-center">
        <div><h1 className="font-serif text-3xl">曲集不存在</h1><Link href="/sheet-music/vocal-exercises" className="mt-4 inline-block text-sm font-semibold text-[#8b1e24]">← 返回练声曲库</Link></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(201,154,72,.15),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/45"><Link href="/sheet-music/vocal-exercises" className="hover:text-white">练声曲库</Link><span>／</span><span>{collection.nameZh}</span></div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">Vocal Exercise Collection</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{collection.nameZh}</h1>
          <p className="mt-2 text-sm text-white/48">{collection.nameRu}</p>
          <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{collection.composerZh || collection.composer}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{collection.years}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{collection.difficulty}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{collection.pieceCount} 首</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-5 lg:grid-cols-[1fr_310px]">
          <div>
            <div className="rounded-[26px] border border-[#ddd5c5] bg-white/80 p-6 md:p-7">
              <p className="gift-kicker">About this collection</p>
              <h2 className="mt-2 font-serif text-2xl">曲集说明</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{collection.description}</p>
            </div>

            <div className="mt-5 overflow-hidden rounded-[26px] border border-[#ddd5c5] bg-white/85">
              <div className="flex items-center justify-between border-b border-[#e9e1d5] bg-[#f1eadf] px-5 py-4 md:px-6">
                <h2 className="font-serif text-xl">现有曲目与资源</h2>
                <span className="text-xs text-slate-400">{collection.pieces?.length || 0} 条已录入资源</span>
              </div>
              {collection.pieces?.length ? (
                <div className="divide-y divide-[#eee8df]">
                  {collection.pieces.map((piece, index) => (
                    <article key={piece.id || index} className="grid gap-3 px-5 py-5 md:grid-cols-[38px_1fr_auto] md:items-center md:px-6">
                      <span className="hidden font-serif text-sm text-slate-300 md:block">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="text-sm font-semibold leading-6">{piece.title}</h3>
                        {piece.titleRu && <p className="mt-1 text-xs text-slate-400">{piece.titleRu}</p>}
                        {piece.opus && <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">{piece.opus}</span>}
                      </div>
                      <div>
                        {piece.pdfUrl ? <a href={piece.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-[#101b27] px-4 py-2 text-xs font-semibold text-white">打开资源</a> : <span className="text-xs text-slate-400">暂无在线链接</span>}
                      </div>
                    </article>
                  ))}
                </div>
              ) : <div className="px-6 py-12 text-sm text-slate-500">这个曲集目前只有目录信息，还没有录入具体曲目链接。</div>}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-[#ddd5c5] bg-[#efe7da] p-5">
              <p className="gift-kicker">Voice types</p>
              <h2 className="mt-2 font-serif text-xl">适用声部</h2>
              <div className="mt-4 flex flex-wrap gap-2">{(collection.voiceTypes || []).map(v => <span key={v} className="rounded-full bg-white/75 px-3 py-1.5 text-xs text-slate-600">{v}</span>)}</div>
            </div>
            <div className="rounded-[24px] border border-[#ddd5c5] bg-white/80 p-5">
              <p className="text-xs font-semibold text-slate-500">资源提示</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">部分链接会跳转到 IMSLP 或其他公开资料页。外部页面的下载权限与版权状态以其页面说明为准。</p>
              {collection.imslpUrl && <a href={collection.imslpUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-semibold text-[#8b1e24]">查看 IMSLP 页面 →</a>}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
