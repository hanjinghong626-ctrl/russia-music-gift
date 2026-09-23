'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'

export default function SheetMusicPage() {
  const [composers, setComposers] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('works')

  useEffect(() => {
    fetch('/data/core-composers-works.json')
      .then(res => res.json())
      .then(data => setComposers(data.composers || []))
      .catch(() => setComposers([]))
      .finally(() => setLoading(false))
  }, [])

  const totalWorks = useMemo(() => composers.reduce((sum, c) => sum + (c.works?.length || 0), 0), [composers])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let items = composers.filter(c => {
      if (!q) return true
      const composerHit = `${c.name_ru} ${c.name_cn} ${c.years}`.toLowerCase().includes(q)
      const workHit = (c.works || []).some(w => `${w.title || ''} ${w.poet || ''} ${w.opus || ''}`.toLowerCase().includes(q))
      return composerHit || workHit
    })
    items = [...items].sort((a, b) => {
      if (sort === 'name') return (a.name_cn || '').localeCompare(b.name_cn || '', 'zh-CN')
      return (b.works?.length || 0) - (a.works?.length || 0)
    })
    return items
  }, [composers, query, sort])

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(201,154,72,.17),transparent_30%)]" />
        <div className="absolute -right-20 top-4 select-none font-serif text-[240px] leading-none text-white/[0.025]">𝄞</div>
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/80">Vocal Score Library</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-5xl">俄罗斯声乐曲库</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 md:text-base md:leading-8">
                以作曲家、作品、诗人和作品号组织俄罗斯浪漫曲资料，同时保留独立的经典练声曲库。先找到作品，再进入乐谱、歌词与移调资源。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div><p className="font-serif text-2xl text-amber-100">{composers.length || '—'}</p><p className="mt-1 text-[11px] text-white/45">作曲家</p></div>
              <div><p className="font-serif text-2xl text-amber-100">{totalWorks || '—'}</p><p className="mt-1 text-[11px] text-white/45">作品</p></div>
              <div><p className="font-serif text-2xl text-amber-100">515+</p><p className="mt-1 text-[11px] text-white/45">练声曲</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
        <Link href="/sheet-music/vocal-exercises" className="group block overflow-hidden rounded-[28px] border border-[#d9d0c0] bg-[#ede4d5] p-6 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101b27] font-serif text-2xl text-amber-100">𝄞</div>
            <div>
              <p className="gift-kicker">Technique Library</p>
              <h2 className="mt-2 font-serif text-2xl md:text-3xl">经典练声曲库</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">阿布特、孔科内、瓦卡伊、博尔东尼等经典教材，按难度、声部和训练目的组织。</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-white/70 px-3 py-1.5">14 个曲集</span>
                <span className="rounded-full bg-white/70 px-3 py-1.5">515+ 首作品</span>
                <span className="rounded-full bg-white/70 px-3 py-1.5">6 种声部</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#8b1e24] transition group-hover:translate-x-1">进入练声曲库 →</span>
          </div>
        </Link>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="gift-kicker">Romance Collection</p>
            <h2 className="mt-2 font-serif text-3xl">按作曲家浏览浪漫曲</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">搜索支持中文名、俄文名、作品标题、诗人和作品号。</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:w-[520px]">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="例如：柴可夫斯基 / Пушкин / Op. 6"
                className="gift-input h-12 rounded-2xl pl-10 pr-4 text-sm"
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="gift-input h-12 rounded-2xl px-4 text-sm sm:w-36">
              <option value="works">作品数量</option>
              <option value="name">姓名排序</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-y border-[#ded6c8] py-3 text-xs text-slate-500">
          <span>{loading ? '正在载入曲库…' : `找到 ${filtered.length} 位作曲家`}</span>
          {query && <button onClick={() => setQuery('')} className="font-medium text-[#8b1e24]">清除搜索</button>}
        </div>

        {loading ? (
          <div className="grid gap-4 py-7 md:grid-cols-2 lg:grid-cols-3">
            {[0,1,2,3,4,5].map(i => <div key={i} className="h-56 animate-pulse rounded-[26px] bg-white/60" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-4 py-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((composer, index) => {
              const matchCount = query.trim()
                ? (composer.works || []).filter(w => `${w.title || ''} ${w.poet || ''} ${w.opus || ''}`.toLowerCase().includes(query.trim().toLowerCase())).length
                : 0
              return (
                <Link key={composer.slug} href={`/sheet-music/${composer.slug}`} className="group relative min-h-[238px] overflow-hidden rounded-[26px] border border-[#dcd3c4] bg-white p-6 transition hover:-translate-y-1 hover:border-[#c9b995] hover:shadow-xl hover:shadow-slate-900/5">
                  <div className="absolute right-5 top-3 select-none font-serif text-7xl text-[#c99a48]/[0.08]">♪</div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{composer.years}</span>
                    </div>
                    <h3 className="mt-8 max-w-[90%] font-serif text-[22px] leading-snug text-slate-900">{composer.name_ru}</h3>
                    <p className="mt-1 text-sm text-slate-500">{composer.name_cn}</p>
                    <div className="mt-auto flex items-end justify-between pt-8">
                      <div>
                        <p className="font-serif text-2xl text-[#8b1e24]">{composer.works?.length || 0}</p>
                        <p className="text-[11px] text-slate-400">首作品</p>
                      </div>
                      <div className="text-right">
                        {matchCount > 0 && <p className="mb-1 text-[11px] text-amber-700">命中 {matchCount} 首作品</p>}
                        <span className="text-sm font-semibold text-slate-700 transition group-hover:text-[#8b1e24]">打开目录 →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="my-8 rounded-[26px] border border-dashed border-[#d1c7b7] bg-white/50 px-6 py-16 text-center">
            <p className="font-serif text-2xl">没有找到匹配内容</p>
            <p className="mt-2 text-sm text-slate-500">可以试试作曲家俄文名、诗人姓名或作品号。</p>
          </div>
        )}
      </section>

      <footer className="border-t border-[#ddd5c5] px-5 py-8 text-center text-xs leading-6 text-slate-400">
        乐谱与歌词链接来自 IMSLP、notarhiv.ru 等公开资源，仅用于学习与研究。使用前请核对具体页面的版权与授权条件。
      </footer>
    </main>
  )
}
