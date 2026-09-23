'use client'

import Link from 'next/link'

export default function ErrorPage({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f4ed] px-5 py-12 text-center text-slate-900">
      <div className="w-full max-w-xl rounded-[30px] border border-[#ddd5c5] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1e24]">Something went wrong</p>
        <h1 className="mt-4 font-serif text-3xl">页面没有正常加载</h1>
        <p className="mt-4 text-sm leading-7 text-slate-500">可以先重新加载这一页；如果问题仍然存在，再回到首页继续使用其他功能。</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => reset()} className="rounded-full bg-[#101b27] px-5 py-2.5 text-sm font-semibold text-white">重新加载</button>
          <Link href="/" className="rounded-full border border-[#d8d0c2] px-5 py-2.5 text-sm font-semibold text-slate-700">返回首页</Link>
        </div>
      </div>
    </main>
  )
}
