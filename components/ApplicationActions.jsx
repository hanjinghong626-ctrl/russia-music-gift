'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EVENT_NAME, readPlan, writePlan } from '../lib/applicationPlan'

export default function ApplicationActions({ school, compact = false }) {
  const [ready, setReady] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [target, setTarget] = useState(false)

  useEffect(() => {
    const sync = () => {
      const plan = readPlan()
      setFavorite(plan.favorites.includes(school.slug))
      setTarget(plan.targets.includes(school.slug))
      setReady(true)
    }
    sync()
    window.addEventListener(EVENT_NAME, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT_NAME, sync)
      window.removeEventListener('storage', sync)
    }
  }, [school.slug])

  const toggleFavorite = () => {
    const plan = readPlan()
    const exists = plan.favorites.includes(school.slug)
    plan.favorites = exists
      ? plan.favorites.filter(slug => slug !== school.slug)
      : [...plan.favorites, school.slug]
    writePlan(plan)
  }

  const toggleTarget = () => {
    const plan = readPlan()
    const exists = plan.targets.includes(school.slug)
    plan.targets = exists
      ? plan.targets.filter(slug => slug !== school.slug)
      : [...plan.targets, school.slug]
    writePlan(plan)
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggleFavorite}
          disabled={!ready}
          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${favorite ? 'border-[#8b1e24] bg-[#8b1e24] text-white' : 'border-[#d8d0c2] bg-white text-slate-600 hover:border-[#bcae95]'}`}
        >
          {favorite ? '★ 已收藏' : '☆ 收藏'}
        </button>
        <button
          type="button"
          onClick={toggleTarget}
          disabled={!ready}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${target ? 'bg-[#101b27] text-white' : 'bg-[#efe7d6] text-[#7d4b22] hover:bg-[#e4d6bd]'}`}
        >
          {target ? '✓ 已加入目标' : '+ 加入目标'}
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-[24px] border border-white/12 bg-white/7 p-4 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">My application</p>
      <p className="mt-2 text-sm leading-6 text-white/65">把这所学校加入你的申请计划，准备进度只保存在当前浏览器。</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={toggleFavorite}
          disabled={!ready}
          className={`rounded-full border px-3 py-2.5 text-sm font-medium transition ${favorite ? 'border-amber-200/35 bg-amber-200/15 text-amber-100' : 'border-white/16 bg-white/7 text-white hover:bg-white/12'}`}
        >
          {favorite ? '★ 已收藏' : '☆ 收藏院校'}
        </button>
        <button
          type="button"
          onClick={toggleTarget}
          disabled={!ready}
          className={`rounded-full px-3 py-2.5 text-sm font-semibold transition ${target ? 'bg-emerald-300 text-emerald-950' : 'bg-white text-slate-950 hover:bg-amber-50'}`}
        >
          {target ? '✓ 已加入目标' : '+ 加入目标院校'}
        </button>
      </div>
      {(favorite || target) && (
        <Link href="/my-application" className="mt-3 inline-flex text-xs text-amber-100/75 underline decoration-white/20 underline-offset-4 hover:text-amber-100">
          打开我的申请中心 →
        </Link>
      )}
    </div>
  )
}
