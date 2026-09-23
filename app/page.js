import Image from 'next/image'
import Link from 'next/link'
import SiteHeader from '../components/SiteHeader'
import { featuredConservatories } from './data/conservatories'

const paths = [
  { href: '/schools', icon: '🏛️', title: '院校数据库', desc: '从城市、专业方向和培养传统出发，认识俄罗斯主要音乐学院。', meta: '9 所核心院校' },
  { href: '/my-application', icon: '◎', title: '我的申请', desc: '收藏院校、建立目标，并追踪俄语、曲目、材料与考试准备进度。', meta: '本地保存 · 无需登录' },
  { href: '/sheet-music', icon: '🎼', title: '俄罗斯声乐曲库', desc: '围绕浪漫曲、练声曲与核心作曲家组织可检索的学习资源。', meta: '作品与练声资料' },
  { href: '/music-history', icon: '📚', title: '音乐史知识库', desc: '按时期、作曲家、学派、歌剧与浪漫曲建立完整知识脉络。', meta: '学习与研究入口' },
  { href: '/music-history/glossary', icon: 'Я', title: '俄中音乐百科', desc: '集中查询俄语音乐术语、体裁、技法和常见专业概念。', meta: '俄中双语' },
  { href: '/evaluate', icon: '✓', title: '作品材料预检', desc: '上传录音后检查格式、体积与时长，并生成留学作品准备清单。', meta: 'Beta · 本地处理' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-slate-900">
      <SiteHeader overlay />

      <section className="relative flex gift-hero-viewport items-end overflow-hidden md:min-h-screen">
        <Image src="/images/hero-bg.webp" alt="莫斯科城市景观" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,25,.28),rgba(8,15,25,.48)_45%,rgba(8,15,25,.90))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(251,191,36,.16),transparent_32%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="max-w-3xl">
            <p className="mb-6 font-display text-sm italic tracking-[0.25em] text-amber-200/90 md:text-base">Музыка — путь к душе</p>
            <h1 className="font-serif text-4xl font-bold tracking-[0.06em] leading-[1.2] text-white md:text-5xl lg:text-[3.5rem]">
              格睿斯音乐留学平台
            </h1>
            <p className="mt-7 max-w-2xl text-[0.95rem] font-light leading-[1.85] text-white/70 md:text-base md:leading-[1.9]">
              为中文音乐学习者整理院校、曲库、音乐史与俄语专业知识。这里不是一张信息海报，而是一套可以继续生长的俄罗斯音乐学习工具。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/schools" className="rounded-full bg-amber-200 px-7 py-3.5 text-sm font-semibold tracking-wide text-slate-950 transition hover:bg-amber-100 hover:shadow-lg hover:shadow-amber-200/20">开始选校 →</Link>
              <Link href="/my-application" className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur transition hover:bg-white/15 hover:border-white/40">我的申请</Link>
              <Link href="/music-history" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium tracking-wide text-white/75 transition hover:bg-white/10 hover:text-white hover:border-white/30">进入音乐史</Link>
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-3 gap-3 border-t border-white/15 pt-6 text-white/75 md:gap-8">
            <div><p className="font-display text-2xl font-medium text-white md:text-3xl">9</p><p className="mt-1 text-xs md:text-sm">核心院校</p></div>
            <div><p className="font-display text-2xl font-medium text-white md:text-3xl">6</p><p className="mt-1 text-xs md:text-sm">核心工具</p></div>
            <div><p className="font-display text-2xl font-medium text-white md:text-3xl">RU · 中文</p><p className="mt-1 text-xs md:text-sm">双语学习框架</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Start here</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">把复杂信息，变成六条清晰路径</h2>
          <p className="mt-4 leading-7 text-slate-600">先找到学校，再把目标院校放进自己的申请计划；作品、音乐史、术语与作品预检则服务于后续学习和专业准备。</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((item, index) => (
            <Link key={item.href} href={item.href} className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,.10)]">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg text-white">{item.icon}</span>
                <span className="text-slate-300 transition group-hover:text-slate-700">↗</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              <p className="mt-6 text-xs font-medium tracking-wide text-amber-700">{item.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/65">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Conservatories</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">先从三所代表性院校开始</h2>
            </div>
            <Link href="/schools" className="text-sm font-medium text-slate-700 hover:text-slate-950">查看全部院校 →</Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredConservatories.map((school, index) => (
              <Link href={`/schools/${school.slug}`} key={school.slug} className="group rounded-3xl bg-[#0b1722] p-7 text-white transition hover:-translate-y-1">
                <div className="flex items-center justify-between text-xs text-white/45"><span>0{index + 1}</span><span>{school.city} · {school.founded}</span></div>
                <h3 className="mt-12 font-serif text-2xl leading-snug">{school.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-white/48">{school.nameRu}</p>
                <p className="mt-6 text-sm leading-7 text-white/68">{school.short}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {school.focus.slice(0, 3).map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{tag}</span>)}
                </div>
                <p className="mt-8 text-sm text-amber-200/90">查看院校档案 →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="overflow-hidden rounded-[2rem] bg-[#8b1e24] px-7 py-10 text-white md:px-12 md:py-14">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">A small beginning</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">这不是“替你决定”的平台，而是帮你把选择看清楚。</h2>
              <p className="mt-5 leading-8 text-white/72">院校、作品、语言与音乐史会继续扩充。当前版本优先保证信息结构清楚、主要入口可用，并适合在手机上浏览。</p>
            </div>
            <Link href="/music-history/glossary" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#8b1e24]">打开俄中百科</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 px-5 py-8 text-sm text-slate-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3"><p>俄罗斯音乐留学 · 学习与信息平台</p><p>Made for music students · 2026</p></div>
      </footer>
    </main>
  )
}
