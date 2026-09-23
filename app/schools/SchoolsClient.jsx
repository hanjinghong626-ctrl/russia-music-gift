'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import ApplicationActions from '../../components/ApplicationActions'

export default function SchoolsClient({ schools }) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('全部')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const cities = ['全部', ...Array.from(new Set(schools.map(s => s.city)))]

  const filtered = useMemo(() => schools.filter(s => {
    const q = query.trim().toLowerCase()
    const haystack = `${s.name} ${s.nameRu} ${s.city} ${s.focus.join(' ')} ${s.studyLevels.join(' ')}`.toLowerCase()
    const hit = !q || haystack.includes(q)
    const cityHit = city === '全部' || s.city === city
    const verificationHit = !verifiedOnly || s.verification.level === 'verified'
    return hit && cityHit && verificationHit
  }), [schools, query, city, verifiedOnly])

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="rounded-[26px] border border-[#ddd5c5] bg-white/70 p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索院校、城市、专业代码或方向…"
            className="gift-input h-12 rounded-2xl px-4 text-sm"
          />
          <button
            type="button"
            onClick={() => setVerifiedOnly(v => !v)}
            className={`h-12 whitespace-nowrap rounded-2xl px-4 text-sm font-medium transition ${verifiedOnly ? 'bg-[#8b1e24] text-white' : 'border border-[#d8d0c2] bg-white text-slate-600 hover:border-[#bcae95]'}`}
          >
            {verifiedOnly ? '✓ 仅看已核实' : '仅看 2026/27 已核实'}
          </button>
        </div>

        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {cities.map(item => (
            <button
              key={item}
              onClick={() => setCity(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${city === item ? 'bg-[#101b27] text-white' : 'border border-[#d8d0c2] bg-white/75 text-slate-600'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-y border-[#ded6c8] py-3 text-xs text-slate-500">
        <span>共 {filtered.length} 所</span>
        <span>点击查看考试 / 语言 / 时间线</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((school, index) => {
          const verified = school.verification.level === 'verified'
          return (
            <article key={school.slug} className="group flex min-h-[374px] flex-col rounded-[26px] border border-[#ddd5c5] bg-white/85 p-6 transition hover:-translate-y-1 hover:border-[#c9b995] hover:shadow-xl hover:shadow-slate-900/5">
              <Link href={`/schools/${school.slug}`} className="block">
                <div className="flex items-start justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className={`rounded-full px-2.5 py-1 text-right normal-case tracking-normal ${verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {verified ? '2026/27 已核实' : '部分核实'}
                  </span>
                </div>
                <p className="mt-5 text-xs text-slate-400">{school.city} · {school.founded}</p>
                <h2 className="mt-2 font-serif text-2xl leading-snug">{school.name}</h2>
                <p className="mt-2 min-h-12 text-xs leading-5 text-slate-400">{school.nameRu}</p>
                <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-600">{school.short}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">{school.focus.slice(0, 4).map(tag => <span key={tag} className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[10px] text-slate-600">{tag}</span>)}</div>
              </Link>
              <div className="mt-auto border-t border-[#eee7dc] pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-400">招生 · 声乐考试 · 俄语 · 时间线</p>
                  <Link href={`/schools/${school.slug}`} className="shrink-0 text-xs font-semibold text-[#8b1e24]">查看 →</Link>
                </div>
                <ApplicationActions school={{ slug: school.slug }} compact />
              </div>
            </article>
          )
        })}
      </div>
      {filtered.length === 0 && (
        <div className="my-8 rounded-[26px] border border-dashed border-[#d1c7b7] bg-white/50 px-6 py-16 text-center">
          <p className="font-serif text-2xl">暂时没有匹配结果</p>
          <p className="mt-2 text-sm text-slate-500">试试其他院校、城市或专业关键词。</p>
        </div>
      )}
    </section>
  )
}
