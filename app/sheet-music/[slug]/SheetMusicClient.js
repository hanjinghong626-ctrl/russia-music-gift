'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import SiteHeader from '../../../components/SiteHeader'

const VOICE_FILTERS = [
  { id: 'all', label: '全部声部' },
  { id: 'solo', label: '独唱' },
  { id: 'ensemble', label: '重唱 / 合唱' },
]

const TAG_FILTERS = [
  { id: 'all', label: '全部版本' },
  { id: 'transpose', label: '移调版' },
  { id: 'allkeys', label: '全调性' },
]

function getVoiceCategory(voiceType = '') {
  const vt = voiceType.toLowerCase()
  if (vt.includes('дуэт') || vt.includes('хор') || vt.includes('ансамбль')) return 'ensemble'
  return 'solo'
}

function getVoiceTag(voiceType = '') {
  if (!voiceType) return null
  if (voiceType.includes('дуэт')) return '二重唱'
  if (voiceType.includes('детского хора')) return '儿童合唱'
  if (voiceType.includes('хор без сопровождения') || voiceType.includes('хор без аккомпанемента')) return '无伴奏合唱'
  if (voiceType.includes('хор') || voiceType.includes('для хора')) return '合唱'
  return voiceType
}

function groupWorksByOpus(works) {
  const groups = new Map()
  works.forEach(work => {
    const raw = work.opus || '无作品号'
    const key = raw.split(' №')[0] || raw
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(work)
  })
  return Array.from(groups, ([label, items]) => ({ label, works: items }))
}

function getPdfUrl(pdfItem) {
  if (!pdfItem) return ''
  return typeof pdfItem === 'string' ? pdfItem : (pdfItem.url || '')
}

export default function SheetMusicClient() {
  const params = useParams()
  const [composers, setComposers] = useState([])
  const [loading, setLoading] = useState(true)
  const [voiceFilter, setVoiceFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [pdfPreview, setPdfPreview] = useState(null)

  useEffect(() => {
    fetch('/data/core-composers-works.json')
      .then(r => r.json())
      .then(d => setComposers(d.composers || []))
      .catch(() => setComposers([]))
      .finally(() => setLoading(false))
  }, [])

  const composer = useMemo(() => composers.find(c => c.slug === params.slug) || null, [composers, params.slug])
  const filtered = useMemo(() => {
    if (!composer) return []
    let works = composer.works || []
    if (voiceFilter !== 'all') works = works.filter(w => getVoiceCategory(w.voice_type) === voiceFilter)
    if (tagFilter === 'transpose') works = works.filter(w => w.has_transposition)
    if (tagFilter === 'allkeys') works = works.filter(w => w.has_all_keys)
    const q = search.trim().toLowerCase()
    if (q) works = works.filter(w => `${w.title || ''} ${w.poet || ''} ${w.opus || ''}`.toLowerCase().includes(q))
    return works
  }, [composer, voiceFilter, tagFilter, search])

  const opusGroups = useMemo(() => groupWorksByOpus(filtered), [filtered])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f7f3ea] text-sm text-slate-500">正在载入作品目录…</div>
  }

  if (!composer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-5 text-center">
        <div><p className="font-serif text-3xl">没有找到这位作曲家</p><Link href="/sheet-music" className="mt-4 inline-block text-sm font-semibold text-[#8b1e24]">← 返回曲库</Link></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-slate-900">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#d9d0c0] bg-[#101b27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(201,154,72,.14),transparent_32%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/45">
            <Link href="/sheet-music" className="transition hover:text-white">俄罗斯声乐曲库</Link><span>／</span><span>{composer.name_cn}</span>
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/70">Composer Catalogue</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">{composer.name_ru}</h1>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="text-lg text-white/72">{composer.name_cn}</p>
            <p className="text-sm text-white/42">{composer.years}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{composer.works?.length || 0} 首作品</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">可按标题 / 诗人 / 作品号检索</span>
          </div>
        </div>
      </section>

      <section className="sticky top-[var(--site-header-height)] z-30 border-b border-[#ddd5c5] bg-[#f7f3ea]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4 md:px-8">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索作品标题、诗人或作品号…" className="gift-input h-11 rounded-2xl px-4 text-sm" />
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {VOICE_FILTERS.map(f => <button key={f.id} onClick={() => setVoiceFilter(f.id)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs transition ${voiceFilter === f.id ? 'bg-[#101b27] text-white' : 'border border-[#d8d0c2] bg-white/70 text-slate-600'}`}>{f.label}</button>)}
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {TAG_FILTERS.map(f => <button key={f.id} onClick={() => setTagFilter(f.id)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs transition ${tagFilter === f.id ? 'bg-[#8b1e24] text-white' : 'border border-[#d8d0c2] bg-white/70 text-slate-600'}`}>{f.label}</button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-9 md:px-8 md:py-12">
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <span>当前显示 {filtered.length} / {composer.works?.length || 0} 首</span>
          {(search || voiceFilter !== 'all' || tagFilter !== 'all') && <button onClick={() => { setSearch(''); setVoiceFilter('all'); setTagFilter('all') }} className="font-semibold text-[#8b1e24]">重置筛选</button>}
        </div>

        {opusGroups.length === 0 ? (
          <div className="rounded-[26px] border border-dashed border-[#d1c7b7] bg-white/50 px-6 py-16 text-center"><p className="font-serif text-2xl">没有匹配的作品</p><p className="mt-2 text-sm text-slate-500">换一个关键词或清除筛选条件试试。</p></div>
        ) : (
          <div className="space-y-5">
            {opusGroups.map(group => (
              <section key={group.label} className="overflow-hidden rounded-[26px] border border-[#ddd5c5] bg-white/80">
                <div className="flex items-center justify-between border-b border-[#ebe4d8] bg-[#f1eadf] px-5 py-4 md:px-6">
                  <h2 className="font-serif text-lg">{group.label}</h2>
                  <span className="text-xs text-slate-400">{group.works.length} 首</span>
                </div>
                <div className="divide-y divide-[#eee8df]">
                  {group.works.map((work, index) => {
                    const voiceTag = getVoiceTag(work.voice_type)
                    const pdfUrl = work.pdf_urls?.length ? getPdfUrl(work.pdf_urls[0]) : ''
                    return (
                      <article key={`${work.opus}-${work.title}-${index}`} className="grid gap-4 px-5 py-5 transition hover:bg-[#fbf8f2] md:grid-cols-[38px_1fr_auto] md:items-center md:px-6">
                        <span className="hidden font-serif text-sm text-slate-300 md:block">{String(index + 1).padStart(2, '0')}</span>
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-semibold leading-6 text-slate-900">{work.title}</h3>
                          {work.poet && <p className="mt-1 text-xs text-slate-400">词：{work.poet}</p>}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {voiceTag && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-500">{voiceTag}</span>}
                            {work.has_transposition && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] text-amber-800">移调版</span>}
                            {work.has_all_keys && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] text-emerald-700">全调性</span>}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {pdfUrl && <button onClick={() => setPdfPreview({ url: pdfUrl, title: work.title })} className="rounded-full bg-[#101b27] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1d2c3c]">查看乐谱</button>}
                          {work.text_url && <a href={work.text_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d8d0c2] bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400">歌词</a>}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {pdfPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm" onClick={() => setPdfPreview(null)}>
          <div className="flex h-[calc(100dvh-1.5rem)] w-full max-w-5xl sm:h-[88dvh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#101b27] px-4 py-3 text-white md:px-5">
              <h3 className="min-w-0 truncate text-sm font-medium">{pdfPreview.title}</h3>
              <div className="flex shrink-0 items-center gap-2">
                <a href={pdfPreview.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15">新窗口打开</a>
                <button onClick={() => setPdfPreview(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg">×</button>
              </div>
            </div>
            <div className="min-h-0 flex-1 bg-slate-100">
              <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfPreview.url)}&embedded=true`} width="100%" height="100%" title={pdfPreview.title} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
