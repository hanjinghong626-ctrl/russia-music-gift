import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-slate-900">
      <SiteHeader />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-16 text-center md:px-8">
        <div className="w-full rounded-[32px] border border-[#ddd5c5] bg-white/80 p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b1e24]">404 · Not found</p>
          <h1 className="mt-4 font-serif text-4xl">这个页面暂时不存在</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">可能是链接已经调整，或者这部分内容还没有录入。你可以回到首页，或者继续查看院校数据库。</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-[#101b27] px-5 py-2.5 text-sm font-semibold text-white">返回首页</Link>
            <Link href="/schools" className="rounded-full border border-[#d8d0c2] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">查看院校</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
