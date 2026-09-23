'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'

const ACCEPTED = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a', 'audio/aac']

function formatBytes(bytes) {
  if (!bytes) return '0 MB'
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '未知'
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function EvaluatePage() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [duration, setDuration] = useState(null)
  const [error, setError] = useState('')

  const checks = useMemo(() => {
    if (!file) return []
    const ext = file.name.split('.').pop()?.toLowerCase()
    const typeOk = ACCEPTED.includes(file.type) || ['mp3', 'wav', 'm4a', 'aac'].includes(ext)
    const sizeOk = file.size <= 100 * 1024 * 1024
    const durationKnown = Number.isFinite(duration)
    const durationOk = durationKnown ? duration >= 60 && duration <= 15 * 60 : null
    return [
      { label: '音频格式', ok: typeOk, text: typeOk ? `${ext?.toUpperCase() || '音频'} 可用于预检` : '建议转换为 MP3 / WAV / M4A' },
      { label: '文件大小', ok: sizeOk, text: `${formatBytes(file.size)}${sizeOk ? '，便于上传与备份' : '，建议压缩到 100 MB 内'}` },
      { label: '录音时长', ok: durationOk, neutral: !durationKnown, text: durationKnown ? `${formatDuration(duration)}${durationOk ? '，适合作为单首作品材料' : '，请结合目标院校曲目要求核对'}` : '浏览器未能读取时长，请手动核对' },
      { label: '文件命名', ok: !/[\u4e00-\u9fa5]/.test(file.name) && !/\s{2,}/.test(file.name), text: '建议使用“姓名_作曲家_作品名_日期”并避免特殊符号' },
    ]
  }, [file, duration])

  const readyCount = checks.filter(c => c.ok).length

  function chooseFile(selected) {
    setError('')
    setDuration(null)
    if (!selected) return
    if (selected.size > 250 * 1024 * 1024) {
      setError('文件过大，请选择 250 MB 以下的音频。')
      setFile(null)
      return
    }
    setFile(selected)
    const url = URL.createObjectURL(selected)
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.onloadedmetadata = () => {
      setDuration(audio.duration)
      URL.revokeObjectURL(url)
    }
    audio.onerror = () => URL.revokeObjectURL(url)
    audio.src = url
  }

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-slate-900">
      <SiteHeader />
      <section className="border-b border-slate-200 bg-[#0b1722] text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs text-amber-100">Beta · 本地材料预检</div>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">先把作品材料整理好，再谈“AI评分”。</h1>
          <p className="mt-5 max-w-2xl leading-8 text-white/62">当前版本先做真正可靠的事：检查录音文件的格式、体积、时长和命名，并给出提交前清单。文件只在你的浏览器中读取，不会上传到服务器。</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">01 · Audio check</p>
          <h2 className="mt-3 font-serif text-2xl">上传一份录音</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">推荐 MP3、WAV 或 M4A。这里只读取文件元数据，不进行上传。</p>

          <input ref={inputRef} type="file" accept="audio/*,.mp3,.wav,.m4a,.aac" className="hidden" onChange={e => chooseFile(e.target.files?.[0])} />
          <button onClick={() => inputRef.current?.click()} className="mt-7 flex min-h-44 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-slate-500 hover:bg-slate-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xl text-white">＋</span>
            <span className="mt-4 font-medium">{file ? '重新选择录音' : '选择音频文件'}</span>
            <span className="mt-1 text-xs text-slate-400">不会上传至服务器</span>
          </button>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          {file && (
            <div className="mt-6 rounded-2xl bg-[#f7f4ed] p-5">
              <p className="break-all font-medium">{file.name}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500"><span>{formatBytes(file.size)}</span><span>{formatDuration(duration)}</span><span>{file.type || '未知 MIME 类型'}</span></div>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-[#efe7d6] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800/70">02 · Checklist</p>
          <h2 className="mt-3 font-serif text-2xl">提交前清单</h2>
          {!file ? (
            <div className="mt-8 rounded-2xl bg-white/60 p-6 text-sm leading-7 text-slate-600">选择录音后，这里会自动生成文件级预检结果。真正的演唱水平、语言、风格和曲目适配仍需要教师或专业评审判断。</div>
          ) : (
            <>
              <div className="mt-6 space-y-3">
                {checks.map(item => (
                  <div key={item.label} className="rounded-2xl bg-white/70 p-4">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${item.neutral ? 'bg-slate-200 text-slate-500' : item.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>{item.neutral ? '·' : item.ok ? '✓' : '!'}</span>
                      <div><p className="font-medium">{item.label}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-600">已通过 {readyCount}/{checks.length} 项自动检查。</p>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <div className="grid gap-8 md:grid-cols-3">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Before audition</p><h2 className="mt-3 font-serif text-2xl">录音之外，还要核对三件事</h2></div>
            <div><h3 className="font-semibold">曲目要求</h3><p className="mt-2 text-sm leading-7 text-slate-600">不同院校、学历和专业的考试曲目可能不同，必须以当年官方招生要求为准。</p></div>
            <div><h3 className="font-semibold">语言与材料</h3><p className="mt-2 text-sm leading-7 text-slate-600">提前统一姓名拼写、作品原文标题、作曲家姓名、视频或音频文件命名和简历版本。</p></div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">后续版本可以接入真正的声学特征分析或教师点评流程；在模型与评审流程没有接通前，本平台不会把自动文件检查包装成“专业演唱评分”。</div>
        </div>
      </section>
    </main>
  )
}
