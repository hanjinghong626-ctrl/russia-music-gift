'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { EVENT_NAME, emptyPlan, normalizePlan, readPlan, writePlan } from '../../lib/applicationPlan'

const DEFAULT_TASKS = [
  { id: 'official', title: '核对下一年度官方招生简章', hint: '确认日期、考试形式、外籍申请通道与当年附件。' },
  { id: 'language', title: '俄语 / 语言考试准备', hint: '按目标院校当年要求准备俄语、TORFL 或校内语言考试。' },
  { id: 'aria', title: '歌剧咏叹调', hint: '建立可覆盖不同风格与语言的候选曲目池。' },
  { id: 'romance', title: '浪漫曲 / 艺术歌曲', hint: '准备俄罗斯作品，并与院校当届曲目规则逐项核对。' },
  { id: 'materials', title: '申请材料', hint: '护照、学历、成绩单、翻译/公证等以当年官方清单为准。' },
  { id: 'exam', title: '专业考试与面试', hint: '同步准备演唱、视唱练耳/乐理、面试等学校要求的环节。' },
]

function tasksFor(plan, slug) {
  const saved = Array.isArray(plan.tasks[slug]) ? plan.tasks[slug] : []
  return DEFAULT_TASKS.map(task => ({ ...task, done: Boolean(saved.find(item => item.id === task.id)?.done) }))
}

function ProgressRing({ value }) {
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#a36c32 ${value * 3.6}deg, #e7dfd1 0deg)` }}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf8f1] text-xs font-semibold text-slate-700">{value}%</div>
    </div>
  )
}

export default function MyApplicationClient({ schools }) {
  const [plan, setPlan] = useState(emptyPlan())
  const [ready, setReady] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const sync = () => {
      setPlan(readPlan())
      setReady(true)
    }
    sync()
    window.addEventListener(EVENT_NAME, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT_NAME, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const schoolMap = useMemo(() => Object.fromEntries(schools.map(s => [s.slug, s])), [schools])
  const targetSchools = plan.targets.map(slug => schoolMap[slug]).filter(Boolean)
  const favoriteSchools = plan.favorites.map(slug => schoolMap[slug]).filter(Boolean)

  const filteredSchools = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return schools
    return schools.filter(s => `${s.name} ${s.nameRu} ${s.city} ${s.focus.join(' ')}`.toLowerCase().includes(q))
  }, [schools, query])

  const update = mutate => {
    const next = normalizePlan(readPlan())
    mutate(next)
    writePlan(next)
    setPlan(next)
  }

  const toggleFavorite = slug => update(next => {
    next.favorites = next.favorites.includes(slug) ? next.favorites.filter(item => item !== slug) : [...next.favorites, slug]
  })

  const toggleTarget = slug => update(next => {
    next.targets = next.targets.includes(slug) ? next.targets.filter(item => item !== slug) : [...next.targets, slug]
  })

  const toggleTask = (slug, taskId) => update(next => {
    const current = tasksFor(next, slug)
    next.tasks[slug] = current.map(task => task.id === taskId ? { id: task.id, done: !task.done } : { id: task.id, done: task.done })
  })

  const setNote = (slug, value) => update(next => {
    next.notes[slug] = value
  })

  const totalTasks = targetSchools.length * DEFAULT_TASKS.length
  const completedTasks = targetSchools.reduce((sum, school) => sum + tasksFor(plan, school.slug).filter(task => task.done).length, 0)
  const overall = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  if (!ready) {
    return <section className="mx-auto max-w-7xl px-5 py-12 text-sm text-slate-500 md:px-8">正在读取本地申请计划…</section>
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[26px] border border-[#ddd5c5] bg-white/80 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Target schools</p>
          <p className="mt-3 font-serif text-4xl">{targetSchools.length}</p>
          <p className="mt-2 text-sm text-slate-500">所目标院校</p>
        </div>
        <div className="rounded-[26px] border border-[#ddd5c5] bg-white/80 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Saved</p>
          <p className="mt-3 font-serif text-4xl">{favoriteSchools.length}</p>
          <p className="mt-2 text-sm text-slate-500">所收藏院校</p>
        </div>
        <div className="flex items-center justify-between rounded-[26px] border border-[#ddd5c5] bg-[#efe7d6] p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-900/50">Overall progress</p>
            <p className="mt-3 font-serif text-2xl">{completedTasks} / {totalTasks || 0}</p>
            <p className="mt-2 text-sm text-slate-500">准备事项已完成</p>
          </div>
          <ProgressRing value={overall} />
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between gap-4 border-b border-[#d8d0c2] pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b1e24]">Application board</p>
          <h2 className="mt-2 font-serif text-3xl">目标院校准备进度</h2>
        </div>
        <span className="hidden text-xs text-slate-400 md:block">每所学校独立保存</span>
      </div>

      {targetSchools.length === 0 ? (
        <div className="mt-6 rounded-[28px] border border-dashed border-[#cfc4b2] bg-white/50 px-6 py-14 text-center">
          <p className="font-serif text-2xl">还没有目标院校</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">从下面选择一所学校加入目标后，这里会自动生成俄语、咏叹调、浪漫曲、材料和考试准备清单。</p>
          <Link href="/schools" className="mt-5 inline-flex rounded-full bg-[#101b27] px-5 py-2.5 text-sm font-semibold text-white">浏览院校数据库</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {targetSchools.map(school => {
            const tasks = tasksFor(plan, school.slug)
            const done = tasks.filter(task => task.done).length
            const progress = Math.round((done / tasks.length) * 100)
            return (
              <article key={school.slug} className="overflow-hidden rounded-[28px] border border-[#d8d0c2] bg-white/85">
                <div className="grid gap-5 border-b border-[#e5ded2] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{school.city}</span><span>·</span><span className={school.verification.level === 'verified' ? 'text-emerald-700' : 'text-amber-700'}>{school.verification.label}</span>
                    </div>
                    <Link href={`/schools/${school.slug}`} className="mt-2 block font-serif text-2xl transition hover:text-[#8b1e24]">{school.name}</Link>
                    <p className="mt-2 text-xs text-slate-400">{school.nameRu}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ProgressRing value={progress} />
                    <button type="button" onClick={() => toggleTarget(school.slug)} className="rounded-full border border-[#d8d0c2] px-3 py-2 text-xs text-slate-500 hover:border-[#8b1e24] hover:text-[#8b1e24]">移出目标</button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1.35fr_.65fr]">
                  <div className="divide-y divide-[#ece6dc] lg:border-r lg:border-[#e5ded2]">
                    {tasks.map(task => (
                      <label key={task.id} className="flex cursor-pointer gap-4 p-5 transition hover:bg-[#fbf8f1] md:px-8">
                        <input type="checkbox" checked={task.done} onChange={() => toggleTask(school.slug, task.id)} className="mt-1 h-5 w-5 accent-[#8b1e24]" />
                        <span>
                          <span className={`block text-sm font-semibold ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</span>
                          <span className="mt-1 block text-xs leading-5 text-slate-400">{task.hint}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">School note</p>
                    <textarea
                      value={plan.notes[school.slug] || ''}
                      onChange={e => setNote(school.slug, e.target.value)}
                      placeholder="记下导师、曲目、材料问题、联系记录……"
                      className="mt-3 min-h-32 w-full resize-y rounded-2xl border border-[#ddd5c5] bg-[#fbf8f1] p-4 text-sm leading-6 outline-none transition focus:border-[#a36c32]"
                    />
                    <p className="mt-4 text-xs leading-5 text-slate-400">提示：{school.cycleNote}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a href={school.official.admission} target="_blank" rel="noreferrer" className="rounded-full bg-[#101b27] px-4 py-2 text-xs font-semibold text-white">官方招生页 ↗</a>
                      <Link href={`/schools/${school.slug}`} className="rounded-full border border-[#d8d0c2] px-4 py-2 text-xs font-semibold text-slate-600">查看院校档案</Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      <div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-[28px] border border-[#ddd5c5] bg-white/75 p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b1e24]">Favorites</p>
          <h2 className="mt-2 font-serif text-2xl">收藏院校</h2>
          {favoriteSchools.length === 0 ? (
            <p className="mt-5 text-sm leading-7 text-slate-500">收藏用于比较，不会自动生成待办。你可以在院校详情页点“收藏院校”。</p>
          ) : (
            <div className="mt-5 space-y-3">
              {favoriteSchools.map(school => (
                <div key={school.slug} className="rounded-2xl border border-[#e6dfd3] bg-[#fbf8f1] p-4">
                  <Link href={`/schools/${school.slug}`} className="font-serif text-lg hover:text-[#8b1e24]">{school.name}</Link>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {!plan.targets.includes(school.slug) && <button onClick={() => toggleTarget(school.slug)} className="rounded-full bg-[#efe7d6] px-3 py-1.5 text-xs font-semibold text-[#7d4b22]">+ 加入目标</button>}
                    <button onClick={() => toggleFavorite(school.slug)} className="rounded-full border border-[#d8d0c2] px-3 py-1.5 text-xs text-slate-500">取消收藏</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-[28px] border border-[#ddd5c5] bg-white/75 p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b1e24]">Add school</p>
          <h2 className="mt-2 font-serif text-2xl">继续选择目标院校</h2>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索院校、城市或方向…" className="gift-input mt-5 h-12 w-full rounded-2xl px-4 text-sm" />
          <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
            {filteredSchools.map(school => {
              const isTarget = plan.targets.includes(school.slug)
              const isFavorite = plan.favorites.includes(school.slug)
              return (
                <div key={school.slug} className="flex gap-3 rounded-2xl border border-[#e6dfd3] bg-[#fbf8f1] p-4">
                  <div className="min-w-0 flex-1">
                    <Link href={`/schools/${school.slug}`} className="block truncate text-sm font-semibold text-slate-800 hover:text-[#8b1e24]">{school.name}</Link>
                    <p className="mt-1 text-xs text-slate-400">{school.city} · {school.focus.slice(0, 3).join(' / ')}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button onClick={() => toggleFavorite(school.slug)} aria-label={isFavorite ? '取消收藏' : '收藏'} className={`h-11 w-11 rounded-full border text-sm ${isFavorite ? 'border-[#8b1e24] bg-[#8b1e24] text-white' : 'border-[#d8d0c2] bg-white text-slate-500'}`}>{isFavorite ? '★' : '☆'}</button>
                    <button onClick={() => toggleTarget(school.slug)} className={`rounded-full px-3 py-2 text-xs font-semibold ${isTarget ? 'bg-[#101b27] text-white' : 'bg-[#efe7d6] text-[#7d4b22]'}`}>{isTarget ? '已加入' : '+ 目标'}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-[24px] border border-amber-900/10 bg-amber-50 px-5 py-4 text-xs leading-6 text-amber-950/65">
        申请中心是个人整理工具，不替代院校当年的官方招生简章。尤其是考试曲目、报名截止日、外籍申请通道和签证材料，应在提交前再次打开学校官网核对。
      </div>
    </section>
  )
}
