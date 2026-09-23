'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const voices = ['全部', '女高音', '女中音', '女低音', '男高音', '男中音', '男低音']

export default function VocalExercisesClient({ collections }) {
  const [query, setQuery] = useState('')
  const [voice, setVoice] = useState('全部')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return collections.filter(c => {
      const hitText = !q || `${c.nameZh} ${c.nameRu} ${c.nameEn || ''} ${c.composerZh || ''} ${c.composer || ''} ${c.difficulty || ''}`.toLowerCase().includes(q)
      const hitVoice = voice === '全部' || (c.voiceTypes || []).includes(voice)
      return hitText && hitVoice
    })
  }, [collections, query, voice])

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索曲集、作曲家或难度…" className="gift-input h-12 rounded-2xl px-4 text-sm" />
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
          {voices.map(item => (
            <button key={item} onClick={() => setVoice(item)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs transition ${voice === item ? 'bg-[#101b27] text-white' : 'border border-[#d8d0c2] bg-white/75 text-slate-600'}`}>{item}</button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-y border-[#ded6c8] py-3 text-xs text-slate-500">
        <span>找到 {filtered.length} 个曲集</span>
        {(query || voice !== '全部') && <button onClick={() => { setQuery(''); setVoice('全部') }} className="font-semibold text-[#8b1e24]">重置筛选</button>}
      </div>

      {filtered.length ? (
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((collection, index) => (
            <Link href={`/sheet-music/vocal-exercises/${collection.id}`} key={collection.id} className="group flex min-h-[290px] flex-col rounded-[26px] border border-[#ddd5c5] bg-white/85 p-6 transition hover:-translate-y-1 hover:border-[#c9b995] hover:shadow-xl hover:shadow-slate-900/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ede4d5] font-serif text-xl text-[#8b1e24]">{String(index + 1).padStart(2, '0')}</div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500">{collection.difficulty}</span>
              </div>
              <h2 className="mt-6 font-serif text-2xl leading-snug">{collection.nameZh}</h2>
              <p className="mt-1 min-h-10 text-xs leading-5 text-slate-400">{collection.nameRu}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{collection.composerZh || collection.composer} <span className="text-slate-400">· {collection.years}</span></p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(collection.voiceTypes || []).slice(0, 4).map(v => <span key={v} className="rounded-full bg-[#f4efe6] px-2.5 py-1 text-[10px] text-slate-600">{v}</span>)}
              </div>
              <div className="mt-auto flex items-end justify-between pt-7">
                <div><p className="font-serif text-2xl text-[#8b1e24]">{collection.pieceCount}</p><p className="text-[10px] text-slate-400">作品</p></div>
                <span className="text-sm font-semibold text-slate-700 transition group-hover:text-[#8b1e24]">查看曲集 →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[26px] border border-dashed border-[#d1c7b7] bg-white/50 px-6 py-16 text-center"><p className="font-serif text-2xl">没有匹配的练声曲集</p><p className="mt-2 text-sm text-slate-500">可以换一个作曲家姓名或声部。</p></div>
      )}
    </>
  )
}
